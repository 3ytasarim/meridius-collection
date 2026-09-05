import * as React from "react";

import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: React.ReactNode };

/**
 * FaqCard — a single FAQ card for the horizontal scroller.
 * 21st.dev `dhileepkumargm/habit-faq-scroller`, recoloured to the Meridius palette.
 */
export function FaqCard({ question, answer }: FaqItem) {
  return (
    <div className="flex w-[300px] flex-shrink-0 flex-col items-start gap-3 rounded-2xl border border-brand/12 bg-white p-6 shadow-[0_24px_55px_-34px_rgba(99,48,199,0.4)] sm:w-[360px]">
      <h3 className="text-[15px] font-bold leading-snug text-[#2B2433] sm:text-base">
        {question}
      </h3>
      <p className="text-[13.5px] leading-relaxed text-[#5b5566] sm:text-sm">
        {answer}
      </p>
    </div>
  );
}

/**
 * HorizontalScroller — seamless left/right looping marquee.
 * `speed` feeds the `--scroll-duration` custom property used by the keyframes.
 */
export function HorizontalScroller({
  children,
  speed = "40s",
  direction = "left",
  className,
}: {
  children: React.ReactNode;
  speed?: string | undefined;
  direction?: ("left" | "right") | undefined;
  className?: string;
}) {
  const animationClass =
    direction === "right"
      ? "animate-scroll-horizontal-reverse"
      : "animate-scroll-horizontal";

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]",
        className,
      )}
    >
      <div
        className={cn("flex w-max", animationClass)}
        style={{ "--scroll-duration": speed } as React.CSSProperties}
      >
        <div className="flex flex-shrink-0 items-stretch gap-6 px-3">
          {children}
        </div>
        <div
          className="flex flex-shrink-0 items-stretch gap-6 px-3"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

type FaqSectionData = {
  mainTitle?: string;
  mainSubtitle?: string;
  rows: {
    id: string | number;
    faqItems: (FaqItem & { id?: string | number })[];
    speed?: string | undefined;
    direction?: ("left" | "right") | undefined;
  }[];
};

/** Original assembled section (title + subtitle + rows). */
export default function FaqSection({ data }: { data: FaqSectionData }) {
  return (
    <div className="relative flex w-full max-w-6xl flex-col items-center gap-10">
      {(data.mainTitle || data.mainSubtitle) && (
        <div className="z-10 flex max-w-2xl flex-col items-center gap-4 text-center">
          {data.mainTitle && (
            <h2 className="text-3xl font-bold leading-tight text-[#2B2433] sm:text-4xl">
              {data.mainTitle}
            </h2>
          )}
          {data.mainSubtitle && (
            <p className="text-[#5b5566]">{data.mainSubtitle}</p>
          )}
        </div>
      )}

      <div className="z-10 flex w-full flex-col gap-6">
        {data.rows.map((row) => (
          <HorizontalScroller
            key={row.id}
            speed={row.speed}
            direction={row.direction}
          >
            {row.faqItems.map((item, i) => (
              <FaqCard
                key={item.id ?? i}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
}
