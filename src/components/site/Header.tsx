import { Home, Briefcase, Users, Mail } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { type TubelightNavItem } from "@/components/ui/tubelight-navbar";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { MeridiusLogo } from "@/components/site/MeridiusLogo";
import { MobileNav } from "@/components/site/MobileNav";

const navItems: TubelightNavItem[] = [
  { name: "Start", url: "/", icon: Home },
  { name: "Leistungen", url: "/leistungen", icon: Briefcase },
  { name: "Über uns", url: "/uber-uns", icon: Users },
  { name: "Kontakt", url: "/kontakt", icon: Mail },
];

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-5 sm:px-8">
        {/* Logo — left */}
        <MeridiusLogo />

        {/* Plain text nav, left aligned next to the logo (indebted.co style) */}
        <nav className="hidden items-center gap-8 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className="relative text-[0.95rem] font-medium text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.url === "/" }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTAs — right (desktop only) */}
        <div className="ml-auto hidden items-center gap-3 xl:flex">
          <ButtonWithIcon
            label="Zahlung erhalten?"
            variant="outline"
            onClick={() => navigate({ to: "/zahlung" })}
          />
          <ButtonWithIcon
            label="Fall einreichen"
            onClick={() => navigate({ to: "/kontakt" })}
          />
        </div>

        {/* Mobile / tablet drawer */}
        <div className="ml-auto xl:hidden">
          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}
