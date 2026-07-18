import Glyph from "@/components/Glyph";
import { CONTACT_EMAIL, CONTACT_LINKS } from "@/content/about";
import { TRADES } from "@/content/trades";

// Chapter 09 — the last page. The six glyphs assemble one final time in
// brass, the invitation sets at full display scale, and the email is the
// single loudest link on the site.
export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="px-page flex min-h-svh flex-col justify-center py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-center gap-5">
          <span className="mono-tag text-brass">09</span>
          <span aria-hidden="true" data-rule className="h-px min-w-0 flex-1 bg-line" />
          <span className="kicker text-ivory/50">Last page</span>
        </div>

        <div data-draw className="mt-14 flex items-center gap-5 text-brass sm:gap-7">
          {TRADES.map((trade) => (
            <Glyph
              key={trade.id}
              id={trade.id}
              title={trade.name}
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
          ))}
        </div>

        <h2
          data-mask
          className="mt-10 font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.97] tracking-[-0.02em] text-ivory"
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
            <p data-reveal className="mono-tag text-ivory/45">
              One email starts it
            </p>
            <a
              data-reveal
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block cursor-pointer font-display text-[clamp(1.5rem,3.6vw,2.7rem)] text-brass-bright underline decoration-brass/40 decoration-1 underline-offset-8 transition-colors duration-300 hover:text-ivory hover:decoration-ivory/50"
            >
              {CONTACT_EMAIL}
            </a>
            <p data-reveal className="mt-8 max-w-md text-[0.95rem] leading-7 text-ivory/55">
              Graduating 2026 and open to work — product engineering,
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex cursor-pointer items-baseline justify-between gap-6 border-t border-line-faint py-4 transition-colors duration-300 last:border-b hover:bg-raised/60"
                >
                  <span className="mono-tag text-ivory/45 transition-colors duration-300 group-hover:text-brass">
                    {link.label}
                  </span>
                  <span className="mono-tag text-ivory/70">{link.value} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p data-reveal className="mono-tag mt-24 text-ivory/35">
          No forms, no scheduling links — just write.
        </p>
      </div>
    </section>
  );
}
