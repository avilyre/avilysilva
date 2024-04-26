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
      <body className={`bg-background ${poppins.className}`}>
        <div className="mx-auto max-w-[800px]">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
