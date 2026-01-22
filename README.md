<div align="center">
<img src="https://github.com/avilyre/avilyre/blob/master/projects-images/avilysilva/logo.png?raw=true" width="150px" height="150px" />
<h1>avily silva</h1>

building and sharing experiences about creating modern interfaces

[![Astro](https://img.shields.io/badge/Astro-5.16-black?logo=astro)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Native-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)<br/>
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/PNPM-package_manager-F69220?logo=pnpm)](https://pnpm.io/)

[Deploy](https://avilysilva.com) <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
[About me](https://avilysilva.com/about) <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
[Blog](https://avilysilva.com/blog)

[Technologies](#-technologies) <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
[Specifications](#-specifications) <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
[Setup](#-setup) <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
[Commands](#-commands)
</div>

## 📌 Technologies

- 🔥 _Astro - Framework_
- 🔥 _TailwindCSS - Style_
- 🔥 _TypeScript - Typing_
- 🔥 _Content Collections API - Contents_
- 🔥 _Resum Content IA - Contents_
- 🔥 _Redis - Content Resum Cache_
- 🔥 _Plaiceholder - For Dynamic Images Blur Effect_
- 🔥 _Tooling - Eslint, Prettier, Husky_

## 📌 Specifications

- ✅ _Responsive_
- ✅ _SEO-friendly_
- ✅ _Accessible_
- ✅ _Tailwind Styled_
- ✅ _Auto Generated Sitemap_
- ✅ _100 Score on Lighthouse_
- ✅ _Auto Generated RSS Feed_
- ✅ _Markdown Support_

## 💻 Setup

To run this project, you need to have the following tools installed on your machine:

- 🟢 [Node.js](https://nodejs.org/) (v22 or higher)
- 🟠 [pnpm](https://pnpm.io/) (Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/avilyre/avilysilva
   cd avilysilva
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

### 🔑 Environment Variables

You will need to add the following environment variables to your `.env` file,
create it in the root of the project and add the following keys:

> [!IMPORTANT]
> To run this project you need to setup all required environment variables.

### With bash command
Copy the `.env` file in the root of the project, same as `package.json` file and setup the variables value.
```bash
cp .env.example .env
```

### Manually

Create manually the `.env` file in the root project with these keys. Don't forget to set the corresponding values.

```env
# IA
GEMINI_API_KEY=<your_gemini_api_key>

# UPSTASH REDIS
REDIS_URL=<your_upstash_redis_url>
REDIS_TOKEN=<your_upstash_redis_token>
```

## 🧞 Commands

All available commands:

| Command                     | Action                                       |
| :-------------------------- | :------------------------------------------- |
| `pnpm install`              | Installs dependencies                        |
| `pnpm run dev`              | Starts local dev server at `localhost:4321`  |
| `pnpm run build`            | Build your production site to `./dist/`      |
| `pnpm run preview`          | Preview your build locally, before deploying |
| `pnpm run lint`             | To run the linter and check some errors      |
| `pnpm run astro sync`       | Sync content collections and generate types  |

built with 💙 ~
