export default function TapedPhoto({
  alt = "diagram / screenshot placeholder",
  aspectClassName = "aspect-[4/3]",
  className = "",
}: {
  alt?: string;
  aspectClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative border border-ink/15 bg-cream p-2 shadow-sm [transform:rotate(2deg)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute -left-3 -top-3 h-6 w-12 bg-accent/15 [transform:rotate(-12deg)]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-3 -top-3 h-6 w-12 bg-accent/15 [transform:rotate(12deg)]"
      />
      <div
        className={`flex items-center justify-center border border-dashed border-ink/25 ${aspectClassName}`}
      >
        <p className="max-w-[80%] text-center font-structural text-xs text-ink/40">
          {alt}
        </p>
      </div>
    </div>
  );
}
