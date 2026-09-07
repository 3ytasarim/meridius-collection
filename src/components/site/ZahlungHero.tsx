import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { ParticlesBg } from "@/components/ui/particles-bg";
import { TextGradient } from "@/components/ui/text-gradient";

export function ZahlungHero() {
  const navigate = useNavigate();

  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(155deg,#EDE4FF_0%,#F6F1FF_38%,#FFFFFF_70%,#F7F3FF_100%)]">
      {/* faint vertical grid — same as the homepage hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(99,48,199,0.07)_1px,transparent_1px)] [background-size:112px_100%]"
      />

      {/* purple particle field (21st.dev particles-bg) */}
      <ParticlesBg
        id="zahlung-hero-particles"
        className="z-0 [mask-image:radial-gradient(80%_80%_at_50%_45%,#000_68%,transparent_100%)]"
        color="#7C45E8"
        lineColor="#9B6BF0"
        count={100}
      />

      <div className="relative z-10 mx-auto flex min-h-[640px] max-w-4xl flex-col items-center px-6 pb-24 pt-[190px] text-center sm:px-8 lg:min-h-[700px]">
        {/* readability scrim behind the copy */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[110%] w-[120%] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(closest-side,rgba(247,243,253,0.68),transparent_72%)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1
            className="max-w-3xl font-extrabold leading-[1.03] tracking-[-0.035em] text-[#2B2433]"
            style={{ fontSize: "clamp(2.75rem, 1.9rem + 3.9vw, 4.5rem)" }}
          >
            Post von Meridius{" "}
            <TextGradient
              as="span"
              children="erhalten?"
              colors={["#6330C7", "#7C45E8", "#A77AF4", "#6330C7"]}
              duration={6}
              angle={90}
              className="font-extrabold pb-[0.12em] leading-[1.15]"
            />
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base font-bold leading-relaxed text-[#2B2433] sm:text-lg">
            Hier finden Sie in wenigen Minuten Antworten auf die häufigsten Fragen
            — und erfahren, wie Sie am schnellsten eine Lösung finden.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ArrowFillButton
              btnText="Direkt kontaktieren"
              href="/kontakt"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                navigate({ to: "/kontakt" });
              }}
              bgColor="#A77AF4"
              textColor="#ffffff"
              fillBgColor="#6330C7"
              fillTextColor="#ffffff"
              hoverFillBgColor="#6330C7"
              hoverFillTextColor="#ffffff"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
