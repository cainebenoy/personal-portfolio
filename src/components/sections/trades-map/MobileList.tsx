import Link from "next/link";
import { edgesForNode, TRADE_NODES } from "./data";

export default function MobileList() {
  return (
    <ul className="mx-auto flex max-w-md flex-col gap-6">
      {TRADE_NODES.map((node) => {
        const edges = edgesForNode(node.id);
        return (
          <li
            key={node.id}
            className="border-b border-grid pb-6 last:border-none"
          >
            <h3 className="font-structural text-lg text-ink">{node.label}</h3>
            <p className="mt-1 font-handwritten text-accent">
              {node.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {edges.map((edge) => (
                <Link
                  key={edge.slug}
                  href={`/work/${edge.slug}`}
                  className="rounded-full border border-ink/25 px-3 py-1 font-structural text-xs text-ink transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {edge.project}
                </Link>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
