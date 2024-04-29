import "@/styles/globals.css";

import { Poppins } from "next/font/google";

import { Footer } from "@/components/layouts/footer";
import { generateSEO } from "@/utility/generate-seo";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const metadata = async () => generateSEO();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`bg-background ${poppins.className} h-screen`}>
        <div className="mx-auto flex h-full max-w-[800px] flex-col justify-between px-6 lg:px-0">
          <div>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
