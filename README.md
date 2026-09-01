# Meridius Collection

Premium marka vitrini. TanStack Start (SSR) + React 19 + Tailwind CSS v4 + shadcn/ui
üzerine kurulu, mor tonlu premium tasarım sistemi ve 21st.dev bileşenleriyle.

## Tech Stack

- **Framework:** TanStack Start (file-based routing, SSR) + TanStack Router / Query
- **UI:** React 19, Tailwind CSS v4, shadcn/ui (new-york), Radix primitives
- **Motion & 3D:** Framer Motion, three.js, @react-three/fiber / drei, @paper-design/shaders-react
- **Build:** Vite, Nitro (Cloudflare target)
- **Paket yöneticisi:** Bun

## Komutlar

```bash
bun install        # bağımlılıklar
bun run dev        # geliştirme sunucusu (Vite)
bun run build      # production build
bun run preview    # build önizleme
bun run lint       # ESLint
bun run format     # Prettier
```

## Klasör Yapısı

```
src/
  routes/          # file-based routing (__root.tsx app shell, index.tsx = /)
  components/
    ui/            # shadcn / 21st.dev bileşenleri
    site/          # sayfa bölümleri (Header, Hero, Features, Leistungen, Ablauf, CTA, Footer)
    blocks/        # kompozit bloklar
  lib/             # yardımcılar, hata yakalama
  hooks/           # custom hook'lar
  assets/          # görsel meta (.asset.json)
  styles.css       # global token'lar + Tailwind
  router.tsx       # router kurulumu
  server.ts        # SSR entry + hata sarmalayıcı
  start.ts         # TanStack Start middleware (CSRF, error)
```

`src/routeTree.gen.ts` otomatik üretilir — elle düzenlenmez.

## Roadmap

Bkz. [roadmap.md](roadmap.md).
