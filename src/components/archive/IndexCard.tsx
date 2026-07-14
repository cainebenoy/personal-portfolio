import CornerTabs from "@/components/CornerTabs";

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5];

export default function IndexCard({
  name,
  issuer,
  index = 0,
}: {
  name: string;
  issuer: string;
  index?: number;
}) {
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <div
      className="relative w-full max-w-[220px] border border-ink/15 bg-surface p-4 shadow-sm"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <CornerTabs />
      <p className="font-structural text-sm leading-snug text-ink">{name}</p>
      <p className="mt-2 font-structural text-xs text-ink/50">{issuer}</p>
    </div>
  );
}
