import { Github, Linkedin as LinkedIn, Mail } from "lucide-react";

import { strings } from "./strings";

export const Footer = () => {
  return (
    <footer
      id="footer"
      tabIndex={0}
      data-testid="footer"
      className="mb-6 flex h-[88px] items-center justify-center gap-8 rounded-2xl py-8 text-secondary transition-[background-color] focus:bg-slate-900"
    >
      <a
        href={strings.linkedIn.href}
        target="_blank"
        className="group relative transition-colors hover:text-primary"
      >
        {strings.linkedIn.title}
        <LinkedIn className="absolute right-full top-1/2 w-4 -translate-x-1 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
      <a
        href={strings.email.href}
        target="_blank"
        className="group relative transition-colors hover:text-primary"
      >
        {strings.email.title}
        <Mail className="absolute right-full top-1/2 w-4 -translate-x-1 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
      <a
        href={strings.github.href}
        target="_blank"
        className="group relative transition-colors hover:text-primary"
      >
        {strings.github.title}
        <Github className="absolute right-full top-1/2 w-4 -translate-x-1 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </footer>
  );
};
