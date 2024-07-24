import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItemProps } from "./interface";

export const NavItem = (props: NavItemProps) => {
  const { children, href } = props;

  const pathname = usePathname();

  const activeLinkClasses =
    "relative text-primary after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:h-[170%] after:w-[130%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-slate-900 after:content-['']";
  const nonActiveLinkClasses = "text-secondary";

  const linkClasses = pathname?.startsWith(href)
    ? activeLinkClasses
    : nonActiveLinkClasses;

  return (
    <Link
      href={href}
      className={`text-base underline-offset-8 transition-colors hover:text-primary ${linkClasses}`}
      aria-current={pathname?.startsWith(href) ? "page" : undefined}
    >
      {children}
    </Link>
  );
};
