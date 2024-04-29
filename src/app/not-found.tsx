import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { strings } from "./not-found.strings";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 text-center text-primary">
      <span className="block select-none text-8xl font-bold text-secondary lg:text-9xl">
        {strings.errorCode}
      </span>
      <p className="max-w-[500px] select-none text-balance text-xl leading-tight text-secondary lg:text-2xl">
        {strings.errorMessage}
      </p>
      <Link
        href="/"
        className="group relative flex items-center gap-2 text-secondary underline underline-offset-8 transition-colors hover:text-primary"
      >
        <ArrowLeft className="absolute right-full top-1/2 -translate-x-1 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" />
        {strings.backToHome}
      </Link>
    </div>
  );
};

export default NotFound;
