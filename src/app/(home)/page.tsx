import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { strings } from "./strings";

export default function Home() {
  const scribbleImageSize = {
    width: 75,
    height: 22,
  };

  return (
    <Fragment>
      <main className="mt-20 lg:mt-[110px]">
        <header className="mx-auto flex max-w-[490px] flex-col items-center gap-16 lg:gap-[3.5rem]">
          <div>
            <h1 className="-leading-6 relative select-none text-center text-6xl font-semibold text-primary lg:text-8xl">
              {strings.title}
              <Image
                src="/images/scribble.svg"
                alt="scribble"
                className="user-select-none absolute left-1 top-[95%] w-[45px] lg:w-[75px]"
                width={scribbleImageSize.width}
                height={scribbleImageSize.height}
              />
            </h1>
            <h2 className="select-none text-right text-xl font-light text-primary lg:text-2xl">
              {strings.role}
            </h2>
          </div>

          <p className="select-none text-balance text-center text-base text-secondary lg:text-xl">
            {strings.description}
          </p>

          <Link
            href="/about"
            className="text-secondary underline underline-offset-8 transition-colors hover:text-primary"
          >
            comece por aqui - <span className="text-primary">sobre {">"}</span>
          </Link>
        </header>
      </main>
    </Fragment>
  );
}
