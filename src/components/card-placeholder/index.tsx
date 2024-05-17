export const CardPlaceholder = () => {
  return (
    <div data-testid="card-placeholder">
      <div className="mb-6 aspect-video w-full border-collapse rounded-md border-2 border-tertiary bg-bg-card-placeholder bg-[length:136px_136px] bg-center bg-no-repeat"></div>
      <div className="mb-4 h-[24px] max-w-[174px] rounded-md border-2 border-tertiary"></div>
      <div className="h-[24px] rounded-md border-2 border-tertiary"></div>
    </div>
  );
};
