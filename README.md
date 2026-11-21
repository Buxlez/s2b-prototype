# S2B Mobile Interactive Prototype (React + Vite)

Standard Chartered Straight2Bank (S2B) mobile interactive prototype converted 1:1 from Figma (`S2B-LOFI`).

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` in a desktop browser (rendered inside an interactive iPhone bezel with a quick-jump screen switcher) or on mobile (full-screen 402×874 scaled viewport).

## Production Build & Deployment

```bash
npm run build
npm run preview
```

The production build outputs static files to `dist/` with relative `./` paths (`base: './'`), supporting deployment on any static host including **GitHub Pages**, **Vercel**, **Netlify**, or **Cloudflare Pages**.

### GitHub Pages Deployment

The app uses hash routing (`#/`, `#/payment-1`, ..., `#/coop-5`) and relative `./assets/` URLs, so `dist/` can be served directly from a subpath such as `https://<user>.github.io/s2b-prototype/`.

## Interactive Highlights

- **Home A ↔ Home B Morphing (`#/`, `#/home-b`)**: 60fps `MotionValue`-driven vertical swipe transition from blank/card areas, scrollable `Homepage-2` feed with a 7-tier progressive frosted blur header and bottom search scrim, and pull-down at `scrollTop === 0` back to State A.
- **Top Control-Center Drawer (`Homepage-2` top → `#/setup-1`)**: Pull down from the top bar region of `Homepage-2` to pull `Set up-1` down continuously from the top edge.
- **Slot-Machine Card Check (`#/payment-4`)**: Vertical 3D card deck (`Orchid Logistics` default) with cubic-bezier ease-in-out momentum spin and bidirectional synchronization with the `Original file` table below.
- **Sequential Checks & Receipt Printer (`#/payment-2`, `#/payment-5`)**: 4-step progressive checkmarks with auto-advance on `Payment-2`, and receipt paper emerging smoothly above the printer lip on `Payment-5` (tap anywhere to continue to `Slide to confirm`).
- **Slidable Confirm & Activate Controls (`#/payment-6`, `#/setup-6`)**: Physical slide-to-confirm / slide-to-activate tracks (`>= 85%` threshold trigger with spring bounce-back).
- **Bottom Sheets & Arc Carousel (`#/setup-3`, `#/setup-4`, `#/setup-5`, `#/coop-5`)**: Floating task bubbles, swipeable parabolic draft-type carousel, and spring slide-up modal sheets with blurred backdrops.

## Known Design Issues Kept As-Is (Spec Section 7)

Per specification, the following Figma design inconsistencies are intentionally preserved:

1. `Cooperation-1` is the chat with **Bob**, yet the input placeholder reads `"Ask Kevin…"`; `Cooperation-4` is the chat with **Kevin**, yet the input placeholder reads `"Ask Bob…"`.
2. In `Cooperation-1`, the top-right Share icon links to **BACK** in Figma.
3. In `Payment-3`, the top-right `"+"` button links to `Set up-2` (Bots list) in the original spec. *(In the updated live Figma prototype inspection, this wire is unwired and left inactive unless wired in Figma.)*
