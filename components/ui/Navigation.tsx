"use client";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full p-8 flex justify-between z-40 pointer-events-none mix-blend-multiply">
      {/* Logo */}
      <div className="pointer-events-auto cursor-none">
        <span className="font-marker text-2xl rotate-[-2deg] block hover:scale-110 transition-transform duration-300">
          Caine.
        </span>
      </div>

      {/* Links */}
      <div className="flex gap-6 font-hand text-xl pointer-events-auto">
        {["Projects", "Journey", "Toolbox"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-highlight transition-colors cursor-none magnetic"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}