import { LogoMarquee, type Logo } from "@/components/ui/logo-marquee";

// Original demo logos from the 21st.dev component source.
const logos: Logo[] = [
  { src: "https://cdn.21st.dev/assets/mirror/bd/bdf5f3ae72bcfda892a686c03b7932985c694e9a9828643c980601bbc9e53cb4.svg", alt: "Nvidia" },
  { src: "https://cdn.21st.dev/assets/mirror/31/319eeae853dd1af99d442b6c16b6c38dc52a66a719f8e502c65f85d26255cbd3.svg", alt: "Supabase" },
  { src: "https://cdn.21st.dev/assets/mirror/2b/2bcdd4124223e3bf8e66bc08ce0ac32a6cc42ffe3584bbecfd377847176a188d.svg", alt: "OpenAI" },
  { src: "https://cdn.21st.dev/assets/mirror/56/5624b7c243ac8d60e848fb5ea222ec932c1600df54a2762238b37498372fb0c8.svg", alt: "Vercel" },
  { src: "https://cdn.21st.dev/assets/mirror/90/90f01a9537335666282ae5acc80bd4305f86d085a92d60904c3aa3ccc4414570.svg", alt: "GitHub" },
  { src: "https://cdn.21st.dev/assets/mirror/96/96517bce3574d648280ff639d01d9889f354b488b3f826db5df746d730232a0c.svg", alt: "Clerk" },
  { src: "https://cdn.21st.dev/assets/mirror/fc/fc7b090ebcfc468d24a1dc482b2db1fcbfd99ca14568552a30ce553d6dda7fcb.svg", alt: "Turso" },
  { src: "https://cdn.21st.dev/assets/mirror/e8/e8514b1206f79e1abdafcc1d2632393cc7cfbcbbe25426ac5143b17b184b56b8.svg", alt: "Claude" },
];

export function TrustedBy() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-stretch gap-3 py-16 sm:flex-row sm:items-center sm:gap-8">
          {/* Heading — left aligned, marquee starts right after it */}
          <h2
            className="shrink-0 font-extrabold leading-[1.05] tracking-[-0.02em] text-[#2B2433] sm:w-max"
            style={{ fontSize: "clamp(1.35rem, 1.05rem + 1.1vw, 2rem)" }}
          >
            Vertrauen führender
            <br />
            Unternehmen
          </h2>

          {/* Marquee fills the rest of the row; fades in/out at the edges */}
          <LogoMarquee
            logos={logos}
            className="flex-1 py-2 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          />
        </div>
      </div>
    </section>
  );
}
