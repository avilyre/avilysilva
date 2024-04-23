import { strings } from "./strings";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-8 text-primary">
      <h1 className="mb-8 text-center text-6xl font-semibold">
        {strings.title}
      </h1>
      <h2 className="max-w-[730px] text-balance text-center">
        {strings.description}
      </h2>
    </main>
  );
}
