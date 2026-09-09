import { Link } from "@tanstack/react-router";

type MeridiusLogoProps = {
  /** Force the wordmark to solid white — for use on dark / brand-colored surfaces. */
  variant?: "color" | "white";
  className?: string;
};

export function MeridiusLogo({ variant = "color", className }: MeridiusLogoProps) {
  return (
    <Link
      to="/"
      aria-label="Meridius Collection"
      className={`inline-flex shrink-0 items-center ${className ?? ""}`}
    >
      <img
        src="/meridius-logo-lockup.png"
        alt="Meridius Collection"
        width={2019}
        height={189}
        className={
          variant === "white"
            ? "h-[33px] w-auto [filter:brightness(0)_invert(1)]"
            : "h-7 w-auto"
        }
      />
    </Link>
  );
}
