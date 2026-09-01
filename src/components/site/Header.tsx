import { Home, Briefcase, Users, Mail, CreditCard } from "lucide-react";
import { NavBar, type TubelightNavItem } from "@/components/ui/tubelight-navbar";
import { BrandMark } from "@/components/ui/navbar-1";

const navItems: TubelightNavItem[] = [
  { name: "Home", url: "#home", icon: Home },
  { name: "Leistungen", url: "#leistungen", icon: Briefcase },
  { name: "Über uns", url: "#ueber-uns", icon: Users },
  { name: "Kontakt", url: "#kontakt", icon: Mail },
  { name: "Zahlung erhalten?", url: "#zahlung", icon: CreditCard },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-brand/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        {/* Logo */}
        <a href="#home" className="flex shrink-0 items-center gap-2.5">
          <BrandMark size={26} />
          <span className="whitespace-nowrap text-[19px] font-extrabold leading-none tracking-[-0.01em] sm:text-[22px]">
            <span className="bg-[linear-gradient(100deg,var(--brand-light),var(--brand-accent)_55%,var(--brand-light))] bg-clip-text text-transparent">
              MERIDIUS
            </span>
            <span className="ml-1.5 bg-[linear-gradient(100deg,var(--brand-accent),var(--brand-light))] bg-clip-text font-light tracking-[0.06em] text-transparent">
              COLLECTION
            </span>
          </span>
        </a>

        {/* Tubelight nav */}
        <NavBar items={navItems} />

        {/* CTA */}
        <a
          href="#fall-einreichen"
          className="hidden shrink-0 items-center justify-center rounded-full bg-brand-accent px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_10px_28px_-10px_var(--brand)] transition-colors hover:bg-brand lg:inline-flex"
        >
          Fall einreichen
        </a>
      </div>
    </header>
  );
}
