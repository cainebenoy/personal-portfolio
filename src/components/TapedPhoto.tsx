import CornerTabs from "@/components/CornerTabs";

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
      className={`relative border border-ink/15 bg-surface p-2 shadow-sm [transform:rotate(2deg)] ${className}`}
    >
      <CornerTabs />
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
