import { Home, Briefcase, CreditCard, Users, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { type TubelightNavItem } from "@/components/ui/tubelight-navbar";
import { MeridiusLogo } from "@/components/site/MeridiusLogo";
import { MobileNav } from "@/components/site/MobileNav";
import { SideCta } from "@/components/site/SideCta";

const navItems: TubelightNavItem[] = [
  { name: "Start", url: "/", icon: Home },
  { name: "Leistungen", url: "/leistungen", icon: Briefcase },
  { name: "Zahlung erhalten?", url: "/zahlung-erhalten", icon: CreditCard },
  { name: "Über uns", url: "/uber-uns", icon: Users },
  { name: "Kontakt", url: "/kontakt", icon: Mail },
];

export function Header() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto flex max-w-[1720px] items-center gap-6 px-6 py-4 sm:px-8">
          {/* Logo — left */}
          <MeridiusLogo />

          {/* Plain text nav — pushed to the far right edge */}
          <nav className="hidden items-center gap-8 xl:ml-auto xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className="relative whitespace-nowrap text-[1.2rem] font-bold leading-none tracking-tight text-foreground [text-shadow:0_1px_2px_rgba(43,15,92,0.16)] transition-[color,text-shadow] duration-300 hover:text-primary hover:[text-shadow:0_0_16px_rgba(124,69,232,0.45)] after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.url === "/" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile / tablet drawer */}
          <div className="ml-auto xl:hidden">
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>

      {/* Sticky right-edge CTA (bewe4r-style) */}
      <SideCta />
    </>
  );
}
