import { Link } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import type { LegalBlock, LegalDocument } from "@/content/legal";

const EMAIL = "info@meridius-collection.ch";
const WEBSITE = "www.meridius-collection.ch";

const linkClass =
  "font-medium text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand";

/** Turns the company e-mail / website inside a line into real links. */
function linkify(line: string) {
  for (const [token, href] of [
    [EMAIL, `mailto:${EMAIL}`],
    [WEBSITE, `https://${WEBSITE}`],
  ] as const) {
    const i = line.indexOf(token);
    if (i !== -1) {
      return (
        <>
          {line.slice(0, i)}
          <a href={href} className={linkClass}>
            {token}
          </a>
          {line.slice(i + token.length)}
        </>
      );
    }
  }
  return line;
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "address") {
    return (
      <address className="rounded-2xl border border-[#ECE7F6] bg-[#FAF8FF] px-5 py-4 not-italic leading-relaxed text-foreground/85">
        {block.lines.map((line) => (
          <span key={line} className="block">
            {linkify(line)}
          </span>
        ))}
      </address>
    );
  }
  return <p className="leading-relaxed text-foreground/80">{block.text}</p>;
}

const otherPages = [
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "AGB", to: "/agb" },
] as const;

/** Shared layout for Impressum, Datenschutzerklärung and AGB. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  const showToc = doc.sections.length > 6;

  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="relative">
          <Header />
          <section className="relative isolate overflow-hidden bg-[linear-gradient(155deg,#EDE4FF_0%,#F6F1FF_38%,#FFFFFF_70%,#F7F3FF_100%)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(99,48,199,0.07)_1px,transparent_1px)] [background-size:112px_100%]"
            />
            <div className="mx-auto max-w-7xl px-6 pb-14 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {doc.title}
              </h1>
              {(doc.subtitle || doc.updated) && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {doc.subtitle}
                  {doc.subtitle && doc.updated && " · "}
                  {doc.updated && `Stand: ${doc.updated}`}
                </p>
              )}
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20">
          <div
            className={
              showToc
                ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16"
                : undefined
            }
          >
            {showToc && (
              <nav
                aria-label="Inhaltsverzeichnis"
                className="hidden lg:sticky lg:top-8 lg:order-last lg:block lg:self-start"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Inhalt
                </p>
                <ol className="mt-4 space-y-2 border-l border-[#ECE7F6] text-sm">
                  {doc.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="-ml-px block border-l border-transparent py-0.5 pl-4 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <article className="max-w-3xl space-y-12">
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-8">
                  <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] sm:text-base">
                    {s.blocks.map((b, i) => (
                      <Block key={i} block={b} />
                    ))}
                  </div>
                </section>
              ))}

              <div className="flex flex-wrap gap-3 border-t border-[#ECE7F6] pt-8 text-sm">
                {otherPages.map((pg) => (
                  <Link
                    key={pg.to}
                    to={pg.to}
                    className="rounded-full border border-[#ECE7F6] px-4 py-2 text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                    activeProps={{
                      className: "border-brand/40 bg-[#FAF8FF] text-brand",
                    }}
                  >
                    {pg.label}
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
