import { Fragment } from "react";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: Readonly<LayoutProps>) {
  const { children } = props;

  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}
