import { strings } from "./strings";

export const Footer = () => {
  return (
    <footer
      data-testid="footer"
      className="flex h-[88px] items-center justify-center gap-8 px-6 text-secondary lg:px-0"
    >
      <a
        href={strings.linkedIn.href}
        target="_blank"
        className="transition-colors hover:text-primary"
      >
        {strings.linkedIn.title}
      </a>
      <a
        href={strings.email.href}
        target="_blank"
        className="transition-colors hover:text-primary"
      >
        {strings.email.title}
      </a>
      <a
        href={strings.github.href}
        target="_blank"
        className="transition-colors hover:text-primary"
      >
        {strings.github.title}
      </a>
    </footer>
  );
};
