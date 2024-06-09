export async function fixAynscComponentRender(
  Component: () => Promise<JSX.Element>,
) {
  const ComponentFixRender = await Component();
  return () => ComponentFixRender;
}
