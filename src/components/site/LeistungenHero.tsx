import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { Globe } from "@/components/ui/globe";
import { TextGradient } from "@/components/ui/text-gradient";

export function LeistungenHero() {
  const navigate = useNavigate();

  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(155deg,#EDE4FF_0%,#F6F1FF_38%,#FFFFFF_70%,#F7F3FF_100%)]">
      {/* faint vertical grid — same as the homepage hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(99,48,199,0.07)_1px,transparent_1px)] [background-size:112px_100%]"
      />

      <div className="relative z-10 mx-auto grid min-h-[640px] max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-[190px] sm:px-8 lg:min-h-[720px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        {/* Copy — left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h1
            className="font-extrabold leading-[1.03] tracking-[-0.035em] text-[#2B2433]"
            style={{ fontSize: "clamp(2.75rem, 1.9rem + 3.9vw, 4.5rem)" }}
          >
            Vier Wege, eine Forderung
            <br className="hidden sm:block" />{" "}
            <TextGradient
              as="span"
              children="zum Abschluss zu bringen."
              colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
              duration={6}
              angle={90}
              className="font-extrabold pb-[0.12em] leading-[1.15]"
            />
          </h1>

          <p className="mt-6 max-w-md text-pretty text-base font-bold leading-relaxed text-[#2B2433] sm:text-lg">
            Von der einzelnen Rechnung bis zum Sammelinkasso über tausende Fälle —
            abgestimmt auf Ihre Branche und Fallgrösse.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ArrowFillButton
              btnText="Kontakt aufnehmen"
              href="/kontakt"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                navigate({ to: "/kontakt" });
              }}
              bgColor="#ffffff"
              textColor="#6330C7"
              fillBgColor="#6330C7"
              fillTextColor="#ffffff"
              hoverFillBgColor="#6330C7"
              hoverFillTextColor="#ffffff"
            />
          </div>
        </motion.div>

        {/* Globe — right */}
        <div className="relative flex h-[320px] w-full items-center justify-center sm:h-[420px] lg:h-[520px]">
          {/* soft light-well behind the globe */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background:radial-gradient(46%_46%_at_55%_50%,rgba(124,69,232,0.14),transparent_72%)]"
          />
          <Globe className="max-h-full max-w-[min(100%,520px)]" />
        </div>
      </div>
    </section>
  );
}
