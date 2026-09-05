import { Home, Briefcase, Users, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { NavBar, type TubelightNavItem } from "@/components/ui/tubelight-navbar";
import { Button3D } from "@/components/ui/button-3d";
import { TextGradient } from "@/components/ui/text-gradient";
import { MeridiusLogo } from "@/components/site/MeridiusLogo";
import { MobileNav } from "@/components/site/MobileNav";

const navItems: TubelightNavItem[] = [
  { name: "Start", url: "/", icon: Home },
  { name: "Leistungen", url: "/leistungen", icon: Briefcase },
  { name: "Über uns", url: "/uber-uns", icon: Users },
  { name: "Kontakt", url: "/kontakt", icon: Mail },
];

const ctaGradient = ["#FFFFFF", "#F4EFFF", "#A77AF4", "#FFFFFF"];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-brand/10 bg-[#EDE6FB]/85 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        {/* Logo — left */}
        <MeridiusLogo />

        {/* Nav — centred on the page, aligned with the hero badge */}
        <NavBar
          items={navItems}
          className="absolute left-1/2 hidden -translate-x-1/2 xl:block"
        />

        {/* CTAs — right (desktop only) */}
        <div className="hidden items-center gap-2.5 xl:flex">
          <Button3D
            asChild
            size="sm"
            variant="outline"
            className="animate-btn-nudge hover:[animation-play-state:paused]"
          >
            <Link to="/zahlung">
              <TextGradient
                children="Zahlung erhalten?"
                as="span"
                colors={ctaGradient}
                duration={5}
                angle={135}
                className="font-semibold"
              />
            </Link>
          </Button3D>
          <Button3D
            asChild
            size="sm"
            className="animate-btn-nudge [animation-delay:2.25s] hover:[animation-play-state:paused]"
          >
            <Link to="/kontakt">
              <TextGradient
                children="Fall einreichen"
                as="span"
                colors={ctaGradient}
                duration={5}
                angle={135}
                className="font-semibold"
              />
            </Link>
          </Button3D>
        </div>

        {/* Mobile / tablet drawer */}
        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
