import "@/styles/globals.css";

import { Poppins } from "next/font/google";

import { generateSEO } from "@/utility/generate-seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600"],
});

export const metadata = async () => generateSEO();

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: Readonly<RootLayoutProps>) {
  const { children } = props;

  return (
    <html lang="pt-BR">
      <body
        className={`mx-auto max-w-[800px] bg-background px-6 lg:px-0 ${poppins.className}`}
      >
        {children}
      </body>
    </html>
  );
}
