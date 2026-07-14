// Washi-tape corners for anything styled as "taped into the page".
// Parent must be `relative`.
export default function CornerTabs() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -left-3 -top-3 h-6 w-12 bg-accent/15 [transform:rotate(-12deg)]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-3 -top-3 h-6 w-12 bg-accent/15 [transform:rotate(12deg)]"
      />
    </>
  );
}
