"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

import type { TubelightNavItem } from "@/components/ui/tubelight-navbar";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { MeridiusLogo } from "@/components/site/MeridiusLogo";

/**
 * Mobile / tablet navigation: a hamburger that opens a modern drawer
 * sliding in from the right (backdrop blur, scroll-lock, Esc to close).
 * Portalled to <body> so the header's `backdrop-blur` doesn't clip it.
 * Shown below `lg`; the desktop tubelight nav takes over from `lg` up.
 */
export function MobileNav({ items }: { items: TubelightNavItem[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label="Menü öffnen"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-xl border border-brand/15 bg-white text-brand shadow-[0_10px_28px_-16px_rgba(99,48,199,0.5)] transition-colors hover:bg-brand-soft"
      >
        <Menu className="size-5" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[60] xl:hidden">
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
                />

                <motion.div
                  key="panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 34 }}
                  className="absolute inset-y-0 right-0 flex w-[min(86vw,360px)] flex-col gap-8 rounded-l-[1.75rem] border-l border-brand/10 bg-[#EDE6FB] p-6 shadow-[-30px_0_70px_-30px_rgba(99,48,199,0.45)]"
                >
                  <div className="flex items-center justify-between">
                    <span onClick={() => setOpen(false)}>
                      <MeridiusLogo />
                    </span>
                    <button
                      type="button"
                      aria-label="Menü schließen"
                      onClick={() => setOpen(false)}
                      className="grid size-9 place-items-center rounded-lg text-brand-dark transition-colors hover:bg-white"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <nav className="flex flex-col">
                    {items.map((it) => (
                      <Link
                        key={it.url}
                        to={it.url}
                        onClick={() => setOpen(false)}
                        className={[
                          "border-b border-brand/10 py-3.5 text-[15px] font-semibold tracking-tight transition-colors",
                          isActive(it.url)
                            ? "text-brand"
                            : "text-[#2B2433] hover:text-brand",
                        ].join(" ")}
                      >
                        {it.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto flex justify-center pt-2">
                    <ArrowFillButton
                      btnText="Fall einreichen"
                      href="/kontakt"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
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
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
