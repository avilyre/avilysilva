import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: Readonly<LayoutProps>) {
  const { children } = props;

  return (
    <div className="flex h-full flex-col lg:h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
