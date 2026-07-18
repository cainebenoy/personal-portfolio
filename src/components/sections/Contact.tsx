import TradeBadge from "@/components/TradeBadge";
import RoughRule from "@/components/RoughRule";
import { CONTACT_EMAIL, CONTACT_LINKS } from "@/content/about";
import { TRADES } from "@/content/trades";

// Chapter 09 — the last page. The six glyphs assemble one final time in
// accent, the invitation sets at full display scale, and the email is the
// single loudest link on the site.
export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="px-page flex min-h-svh flex-col justify-center py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div data-draw className="flex items-center gap-5">
          <span className="mono-tag text-red">09</span>
          <RoughRule />
          <span className="kicker text-ink/65">Last page</span>
        </div>

        <div data-draw className="mt-14 flex items-center gap-5 sm:gap-7">
          {TRADES.map((trade) => (
            <TradeBadge
              key={trade.id}
              id={trade.id}
              showLabel={false}
              glyphClassName="h-6 w-6 sm:h-8 sm:w-8"
            />
          ))}
        </div>

        <h2
          data-mask
          className="mt-10 font-display text-[clamp(3rem,10vw,8.5rem)] leading-[1.04] text-ink"
        >
          <span className="mask-line">
            <span>Let&apos;s build</span>
          </span>
          <span className="mask-line">
            <span>something.</span>
          </span>
        </h2>

        <div className="mt-14 grid gap-x-20 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p data-reveal className="mono-tag text-ink/60">
              One email starts it
            </p>
            <a
              data-reveal
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block cursor-pointer font-display text-[clamp(1.7rem,4vw,3rem)] text-accent-bright underline decoration-accent/50 decoration-wavy decoration-1 underline-offset-8 transition-colors duration-300 hover:text-ink hover:decoration-ink/50"
            >
              {CONTACT_EMAIL}
            </a>
            <p data-reveal className="mt-8 max-w-md text-[0.95rem] leading-7 text-ink/70">
              Graduating in 2026 and open to work: product engineering,
              generalist problems, or something that doesn&apos;t have a job
              title yet. If it needs figuring out, that counts.
            </p>
          </div>

          <ul
            data-reveal-group
            className="flex flex-col self-end lg:col-span-4 lg:col-start-9"
          >
            {CONTACT_LINKS.filter((l) => l.label !== "Email").map((link) => (
              <li key={link.label} data-reveal-item>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex cursor-pointer items-baseline justify-between gap-6 py-2.5"
                >
                  <span className="mono-tag text-ink/60 transition-colors duration-300 group-hover:text-accent">
                    {link.label}
                  </span>
                  <span className="mono-tag text-ink/70 underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-accent">
                    {link.value} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
