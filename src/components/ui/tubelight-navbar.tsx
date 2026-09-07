"use client";

import { motion } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Internal routes the navbar can point to. */
export type NavHref =
  | "/"
  | "/leistungen"
  | "/uber-uns"
  | "/kontakt"
  | "/zahlung-erhalten";

export interface TubelightNavItem {
  name: string;
  url: NavHref;
  icon: LucideIcon;
}

export function NavBar({
  items,
  className,
}: {
  items: TubelightNavItem[];
  className?: string;
}) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const activeName =
    items.find((item) =>
      item.url === "/" ? pathname === "/" : pathname.startsWith(item.url),
    )?.name ?? "";

  return (
    <div className={cn("z-50", className)}>
      <div className="flex items-center gap-1 rounded-full border border-brand/10 bg-white px-1 py-1 shadow-[0_18px_50px_-28px_rgba(99,48,199,0.35)]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeName === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              className={cn(
                "relative cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-[14px] font-semibold transition-colors",
                "text-[var(--text-muted)] hover:text-[var(--brand)]",
                isActive && "text-[var(--brand)]",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.4} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 -z-10 w-full rounded-full bg-[color-mix(in_oklab,var(--brand-accent)_16%,transparent)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-brand-accent">
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-brand-accent/25 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-brand-accent/25 blur-md" />
                    <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-brand-accent/25 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
