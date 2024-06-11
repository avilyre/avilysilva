import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins } from "next/font/google";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
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
        <Navbar />
        <div className="pb-16 pt-8">{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
