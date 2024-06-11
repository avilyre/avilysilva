export const Loading = () => {
  return (
    <div>
      <div className="mb-8 aspect-video w-full animate-pulse select-none rounded-md bg-tertiary sm:aspect-[16/5.68]" />
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="max-w-[488px] flex-1">
          <div className="mb-16">
            <div className="h-[48px] animate-pulse rounded-md bg-tertiary" />
            <div className="max-w-[384px gap-2] flex flex-col">
              <div className="mt-3 h-4 max-w-[300px] animate-pulse rounded-md bg-tertiary" />
              <div className="mt-3 h-4 max-w-[350px] animate-pulse rounded-md bg-tertiary" />
              <div className="mt-3 h-4 w-full animate-pulse rounded-md bg-tertiary" />
              <div className="mt-3 h-4 w-full animate-pulse rounded-md bg-tertiary" />
              <div className="mt-3 h-4 max-w-[280px] animate-pulse rounded-md bg-tertiary" />
              <div className="mt-3 h-4 w-full animate-pulse rounded-md bg-tertiary" />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="inline-block h-[48px] w-[48px] animate-pulse rounded-md bg-tertiary" />
            <div className="inline-block h-[48px] w-[48px] animate-pulse rounded-md bg-tertiary" />
            <div className="inline-block h-[48px] w-[48px] animate-pulse rounded-md bg-tertiary" />
          </div>
        </div>

        <div className="flex max-w-[165px] flex-1 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full animate-pulse rounded-md bg-tertiary"></div>
            <div className="h-4 max-w-[200px] animate-pulse rounded-md bg-tertiary"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full animate-pulse rounded-md bg-tertiary"></div>
            <div className="h-4 max-w-[200px] animate-pulse rounded-md bg-tertiary"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full animate-pulse rounded-md bg-tertiary"></div>
            <div className="h-4 max-w-[200px] animate-pulse rounded-md bg-tertiary"></div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-24">
        <div className="mb-11 h-8 max-w-[200px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="flex flex-col gap-2">
          <div className="h-6 max-w-[384px] animate-pulse rounded-md bg-tertiary"></div>
          <div className="h-6 w-full animate-pulse rounded-md bg-tertiary"></div>
          <div className="h-6 w-full animate-pulse rounded-md bg-tertiary"></div>
          <div className="h-6 max-w-[640px] animate-pulse rounded-md bg-tertiary"></div>
          <div className="h-6 w-full animate-pulse rounded-md bg-tertiary"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
