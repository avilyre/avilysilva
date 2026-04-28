# Plano: Gamification (Quiz + XP) v1

## Sumário

Implementar um fluxo de gamificação no blog com:

- Um identificador pseudônimo por dispositivo (`anon_id`) persistido em `localStorage`.
- Um CTA no fim do post para abrir um quiz (lazy load) e submeter respostas.
- Cálculo e concessão de XP exclusivamente no servidor, com idempotência para evitar duplicação.
- Um “perfil” acessível na navbar (dropdown) exibindo nível, XP total e XP faltante.
- Feature flag global via variável de ambiente (liga/desliga por ambiente).

O v1 fica intencionalmente enxuto:

- Sem tracking/telemetria.
- Sem armazenar IP/User-Agent.
- Sem ledger/histórico completo de XP (apenas `xp_total` + derivação de `level`).
- Quizzes versionados no repositório (content collection).

## Análise do Documento (trechos recebidos)

### Concorrência / idempotência

- Risco: múltiplas submissões simultâneas.
- Mitigação no v1: idempotência por `(anon_id, post_id, quiz_version)` usando `SET NX` no Redis antes de aplicar `INCRBY` no XP.
- Resultado: mesmo com retries ou cliques duplicados, o XP é aplicado no máximo uma vez por versão.

### Performance e cache

- `/me/gamification`: resposta por usuário/dispositivo, idealmente barata (apenas 1 leitura do XP no Redis + cálculo local do nível) e cache curta em memória por request.
- Quiz por `post_id + version`: como o conteúdo do quiz é público e versionado, pode responder com `Cache-Control` para permitir cache no CDN, mantendo a invalidação via mudança de `quiz_version`.
- Lazy load: o quiz é buscado apenas quando o usuário clicar no CTA no fim do post.

### Segurança / antifraude

- Validação forte server-side:
  - Validar que `question_id` e `option_id` pertencem ao quiz do `post_id + version` retornado.
  - Não confiar em score do cliente.
- Rate limit:
  - Limitar criação/submissão (ex.: 10/min) por `anon_id`.
- Auditoria:
  - No v1, não armazenar IP/User-Agent (decisão confirmada).

### LGPD / privacidade

- `anon_id` é pseudônimo e fica no dispositivo (localStorage).
- No servidor, armazenar apenas o mínimo necessário para operação:
  - XP total por `anon_id`.
  - Chave(s) de idempotência por `anon_id + post_id + quiz_version`.
- Retenção:
  - O documento sugere retenção de tentativas (ex.: 12 meses). No v1, isso se aplica às chaves de idempotência e ao XP do anon_id via TTL “deslizante” (renovar TTL em leitura/escrita), para reduzir acúmulo e respeitar retenção.

### Critérios de aceite (alto nível) x decisões atuais

O documento cita “card de progresso no post”. A decisão atual foi “perfil na navbar com dropdown” e sem card no post.

- Para evitar dívida técnica, este plano assume que o critério de aceite será ajustado para refletir o dropdown na navbar como fonte principal de progresso.
- Se o card no post ainda for obrigatório, o plano deve ser atualizado (mudança de UI/UX e regras de renderização).

## Estado Atual do Repositório (descoberto por inspeção)

- Stack: Astro + TypeScript strict, Tailwind v4 e Vercel adapter Node runtime.
- Apenas um endpoint de API hoje: `/api/summarize` com Redis (Upstash) para cache.
- Não existe:
  - Sistema de feature flags.
  - Infra de tracking/telemetria.
  - Qualquer modelagem de quiz/gamificação.
- Padrões relevantes:
  - Componentes com interações client-side usam `<script>` local e, quando útil, Custom Elements (ex.: `summary-content-ai` no post).

Arquivos de referência:

- Arquitetura: [architecture.md](file:///workspace/.trae/reference/architecture.md)
- Padrões: [code-patterns.md](file:///workspace/.trae/reference/code-patterns.md)

## Decisões Confirmadas (a partir das perguntas respondidas)

- Regra de XP: conceder 1x por versão (`post_id + quiz_version`).
- Retentativas: permitidas, mas sem XP adicional (XP só na primeira elegível).
- Persistência do `anon_id`: `localStorage`.
- Quizzes: armazenados no repositório.
- Ledger de XP: não (apenas total).
- Perfil/progresso: “na navbar com dropdown” (sem card no post).
- Telemetria: não no v1.
- Auditoria IP/UA: não no v1.
- XP por quiz: 25 XP.
- Fórmula de level: linear `level = floor(xp_total / X) + 1`.
- X (XP por nível): 20.
- Feature flag: env var on/off (sem rollout percentual no v1).
- CTA quiz: sempre visível no fim do post.
- Tipos de pergunta: apenas múltipla escolha (single select).

## Proposta Técnica (implementação)

### 1) Modelo de Dados (quiz)

Criar uma nova content collection `quizzes` com arquivos JSON versionados no repositório.

- Local: `src/content/quizzes/**`
- Schema (Zod) no `content.config.ts`:
  - `postId: string`
  - `version: number`
  - `isActive: boolean`
  - `xpReward: number` (fixo 25 no v1, mas mantido no conteúdo para flexibilidade)
  - `questions: Array<{ id: string; title: string; options: Array<{ id: string; label: string; isCorrect: boolean }> }>`

Observação: manter `isCorrect` no conteúdo é necessário para validação e (mesmo que XP seja fixo) para exibir resultado “acertos/erros” sem confiar no cliente.

### 2) Persistência e chaves no Redis

Usar Redis (Upstash) como storage do v1:

- XP total:
  - `gamification:xp:<anonId>` -> integer
- Idempotência de XP por versão:
  - `gamification:award:<anonId>:<postId>:<quizVersion>` -> string (ex.: attemptId) via `SET NX`
- Rate limit:
  - `gamification:rl:submit:<anonId>:<window>` -> integer via `INCR` com `EX=60`

TTL/retention (12 meses, renovável):

- Em cada leitura/escrita de `gamification:xp:*`, renovar expiração para 12 meses.
- Chaves `award:*` com expiração de 12 meses para impedir duplicação dentro da janela de retenção e evitar acúmulo indefinido.

### 3) Feature flag

- Variável de ambiente: `GAMIFICATION_BLOG_V1_ENABLED` (`"true"`/`"false"`).
- Comportamento:
  - Quando desabilitada: UI não renderiza CTA e navbar dropdown não aparece; endpoints retornam `404` ou `403` (decisão: `404` minimiza exposição).

### 4) Endpoints (Astro API Routes)

Criar endpoints novos sob `src/pages/api`:

1. `GET /api/me/gamification`
   - Entrada: header `X-Anon-Id` (lido pelo server) ou query param fallback (definir 1 abordagem e manter consistente).
   - Saída: `{ anonId, xpTotal, level, xpToNextLevel }`
   - Cache:
     - `Cache-Control: private, max-age=10` (TTL curto) ou sem cache (decidir no executor).

2. `GET /api/quiz`
   - Entrada: `postId`
   - Saída: quiz ativo `{ postId, version, xpReward, questions: [{ id, title, options: [{ id, label }] }] }`
   - Não retornar `isCorrect` para o cliente.
   - Cache:
     - `Cache-Control: public, max-age=300, s-maxage=3600, stale-while-revalidate=86400`
     - ETag baseada em `postId + version` (opcional).

3. `POST /api/quiz/submit`
   - Entrada (JSON):
     - `anonId`
     - `postId`
     - `quizVersion`
     - `answers: Array<{ questionId: string; optionId: string }>`
   - Validações:
     - Quiz existe e `isActive`.
     - `quizVersion` coincide.
     - Cada `questionId` existe no quiz.
     - Cada `optionId` pertence à questão.
     - Rate limit por `anonId`.
   - Processamento:
     - Calcular `correctCount` comparando com `isCorrect`.
     - Definir `awardKey` e tentar `SET NX`.
     - Se primeira vez: `INCRBY xpKey 25` e responder `awarded=true`.
     - Se já premiado: responder `awarded=false` e não incrementar.
     - Sempre responder XP total atual + level derivado.
   - Saída:
     - `{ awarded, xpDelta, xpTotal, level, correctCount, totalQuestions }`

### 5) Frontend (Astro components + client scripts)

#### Navbar dropdown (perfil/progresso)

- Atualizar `src/components/layouts/navbar.astro` para incluir um item “Meu Progresso” com dropdown.
- Comportamento:
  - Ao abrir dropdown (ou no `DOMContentLoaded`), buscar `/api/me/gamification` com `X-Anon-Id`.
  - Renderizar:
    - Nível
    - XP total
    - XP faltante para o próximo nível
  - Estados:
    - Loading (texto simples, sem skeleton complexo)
    - Erro (mensagem e botão “tentar novamente”)

#### CTA + Modal do quiz no fim do post

- Atualizar `src/pages/blog/[...slug].astro` para renderizar um bloco no fim do post:
  - CTA “Ganhar XP: responder quiz”
  - Ao clicar:
    - Buscar `/api/quiz?postId=<slug>`
    - Renderizar modal com perguntas
    - Submeter para `/api/quiz/submit`
  - Lazy load garantido: nada de questões/quiz no HTML inicial.

Estrutura sugerida de feature:

- `src/features/gamification/components/quiz-cta.astro`
- `src/features/gamification/components/quiz-modal.astro`
- `src/features/gamification/utility/anon-id.ts` (client)
- `src/features/gamification/utility/level.ts` (server/shared)
- `src/features/gamification/utility/rate-limit.ts` (server)
- `src/features/gamification/types.ts`

Observação: manter todo novo código em inglês (nomes de variáveis/funções) e sem comentários, seguindo [clean-code.md](file:///workspace/.trae/rules/clean-code.md).

### 6) Regras de UX para evitar inconsistências

- O `anon_id` deve ser criado no cliente sem bloquear a navegação:
  - No primeiro load, se não existir, gerar `crypto.randomUUID()` e armazenar em localStorage.
- `anon_id` deve ser enviado em todas as chamadas de gamificação via header `X-Anon-Id`.
- O dropdown da navbar não deve quebrar se o usuário estiver offline ou se a feature flag estiver off.

## Arquivos que serão criados/alterados

**Alterar**

- `src/content.config.ts` (adicionar collection `quizzes`).
- `src/pages/blog/[...slug].astro` (CTA do quiz no fim do post).
- `src/components/layouts/navbar.astro` (dropdown “Meu Progresso”).
- `src/lib/redis.ts` (se necessário, adicionar helpers tipados, mantendo compatibilidade).
- `.env.example` (adicionar `GAMIFICATION_BLOG_V1_ENABLED`).

**Criar**

- `src/content/quizzes/<postId>/v1.json` (exemplos iniciais de quiz; pelo menos 1 post).
- `src/pages/api/me/gamification.ts`
- `src/pages/api/quiz.ts`
- `src/pages/api/quiz/submit.ts`
- `src/features/gamification/**` (componentes + utilities + types).

## Testes e Verificação

### Verificação manual (dev)

- Com flag off:
  - Navbar não exibe dropdown de progresso.
  - CTA do quiz não aparece no fim do post.
  - Endpoints de gamificação retornam 404/403 (conforme decisão final).

- Com flag on:
  - Primeiro acesso cria `anon_id` em localStorage.
  - Navbar dropdown mostra nível/XP e “XP faltante”.
  - No fim de um post com quiz ativo, CTA aparece.
  - Ao abrir modal, questões carregam somente após clique (validar via Network tab).
  - Submissão válida concede +25 XP uma única vez por `post_id + version`.
  - Retry (reenvio) não duplica XP.
  - Se o quiz falhar ao carregar, usuário vê erro e consegue tentar novamente.

### Verificação automatizada (mínimo viável)

- Adicionar testes unitários (se o repo já tiver framework; caso não, criar um script simples de verificação de funções puras):
  - `calculateLevel(xpTotal)` com `X=20`.
  - `validateQuizSubmission(quiz, answers)` cobrindo casos inválidos.

## Pontos em Aberto (para evitar dívida técnica)

- Confirmar atualização do critério “card de progresso no post” para “progresso na navbar”.
- Confirmar política final de retenção (12 meses) aplicada também às chaves de idempotência (award) e ao XP total.
- Confirmar comportamento de endpoints quando flag off: 404 vs 403.

