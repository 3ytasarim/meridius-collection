"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { BlurredStaggerText } from "@/components/ui/blurred-stagger-text";

export type FaqItem = { question: string; answer: string };

/**
 * Service FAQ — a real accordion (Radix primitives: semantic <button>,
 * aria-expanded / aria-controls, full keyboard support). Items open
 * independently. Open state is tracked in React and the stateful visuals
 * (tint, border, the + → × turn, the panel reveal) are driven by inline style
 * so they never depend on conditional utility classes. The panel animates via a
 * grid-rows transition — smooth, no height jump, no horizontal shift.
 */
export function ServiceFaq({
  items,
  idBase,
}: {
  items: FaqItem[];
  idBase: string;
}) {
  const [open, setOpen] = React.useState<string[]>([]);

  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={open}
      onValueChange={setOpen}
      className="flex flex-col gap-2.5"
    >
      {items.map((item, i) => {
        const val = `${idBase}-${i}`;
        const isOpen = open.includes(val);
        return (
          <AccordionPrimitive.Item
            key={val}
            value={val}
            className="overflow-hidden rounded-[13px] border"
            style={{
              borderColor: isOpen ? "#C6B4F0" : "#EBE7F4",
              backgroundColor: isOpen ? "#FAF7FE" : "#FFFFFF",
              transition: "background-color .2s ease, border-color .2s ease",
            }}
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="flex w-full items-center gap-3 px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:px-5">
                <span
                  aria-hidden
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F1ECFE] text-[11px] font-bold text-brand"
                >
                  ?
                </span>
                <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-[#241E33]">
                  {item.question}
                </span>
                <Plus
                  aria-hidden
                  strokeWidth={2.5}
                  className="size-4 shrink-0 text-brand motion-reduce:!transition-none"
                  style={{
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform .28s cubic-bezier(.16,1,.3,1)",
                  }}
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content
              forceMount
              className="grid overflow-hidden text-sm motion-reduce:!transition-none"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows .3s ease-out",
              }}
            >
              <div className="min-h-0">
                <BlurredStaggerText
                  key={isOpen ? `${val}-open` : `${val}-closed`}
                  text={item.answer}
                  trigger="mount"
                  className="pb-4 pl-[3.25rem] pr-4 text-[14px] leading-relaxed text-[#5B5568] sm:pl-[3.75rem] sm:pr-5"
                />
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
}

export default ServiceFaq;
