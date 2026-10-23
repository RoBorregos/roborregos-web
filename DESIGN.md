# Design System

Dark, bold and technical. Structure follows roborregos.com (Home → About → Projects → Members → Candidates → Support Us); the visual language follows the Candidates dashboard (black, royal blue, big display type, soft gradients).

Stack: Create React App + Tailwind CSS 3 (`tailwind.config.js`, `src/index.css`). No per-component CSS files.

## Color

| Token (Tailwind) | Value | Use |
|---|---|---|
| `bg-black` | `#000` | Page background |
| `roboblue` | `#0A38EF` | Primary accent: titles, active nav, buttons |
| `navy` | `#051B72` | Glows and gradient ends |
| `rbrgs` | `#0070F3` | Icon hover, check marks |
| `steel` | `#4F72B8` | Outlines on cards and secondary buttons |
| `card` | `#13191E` | Card surfaces |
| `footer` | `rgb(10,15,20)` | Footer base |
| `neutral-950 → neutral-800` | gradient | Section and footer backgrounds |

Dark theme only. Text is white; secondary text is `gray-300`/`gray-400`.

## Typography

- **Jersey 25** (`font-jersey`): page and section titles, large pixel-style display, in `roboblue`.
- **Anton** (`font-anton`): subtitles, labels, card titles, uppercase with wide tracking.
- **Archivo** (`font-archivo`): body and navigation.

Shared classes in `src/index.css`: `.section-title`, `.section-subtitle`, `.rb-card`, `.rb-btn` (filled pill), `.rb-btn-outline` (outlined pill).

## Layout and components

- Fixed top navbar, `h-16`, black with blur; active link has a `roboblue` underline; hamburger menu below `lg`.
- Every page opens with `HeaderBanner` (full-height, big Jersey title, navy glow, logo watermark, scroll-down arrow). Home uses its own hero with the team photo and rotating "We create/build/…" text.
- Sections alternate `bg-black`, `from-neutral-900 to-neutral-950` and `from-neutral-950 to-neutral-800`, with `max-w-6xl` content and `px-6` gutters.
- Cards: `rounded-xl`, `bg-card` or the neutral gradient; hover lifts (`-translate-y-1`) with a blue glow `shadow-[0_0_30px_rgba(10,56,239,0.4)]`.
- Carousels and modals are plain React + Tailwind (no Material-UI or Bootstrap). Modals close on backdrop click; member modal supports prev/next.
- Forms: dark card, white inputs for the contact form, invisible reCAPTCHA, toast via `Shared/FormsSnackBar`.

## Motion

CSS transitions of 300 ms for hover (scale/translate/color), 500–700 ms for image zoom and carousel crossfade. Respect small screens: no motion is required to understand content.

## Responsive

Mobile first. Grids collapse to one column below `md`; navbar collapses below `lg`.
