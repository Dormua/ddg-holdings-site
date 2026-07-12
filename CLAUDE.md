# DDG HOLDINGS — Website Build Instructions

You are building a one-page website for DDG HOLDINGS, a consumer products
holdings company focused on the Middle East. DDG upgrades, improves, and
creates sustainable, well-branded consumer products built for the current
era — in markets where competition is concentrated among a few legacy players
who haven't rethought their products in decades. The edge: bringing
global-standard positioning, branding, and product quality to categories the
region's incumbents have left stale. First brand in the pipeline: a
tablet-based foaming hand soap refill system (plastic-free).

**The site's job:** credibility. The audience is international manufacturers and
partners (China, Vietnam, Korea) who will Google the company after receiving an
inquiry email. They must land on this page and think: "these people are legit."
It is NOT a consumer sales page. Every decision serves that single job.

**Language:** English only. Tone: sharp, confident, a little irreverent —
think tiny.com, not corporate boilerplate.

---

## Non-negotiables

1. `tokens.css` is the single source of truth. Never write a raw hex value,
   font-family, or magic spacing number in any other file. If a value you need
   doesn't exist, add it to tokens.css first, following its naming scheme.
2. Read the USAGE RULES comment block at the bottom of tokens.css before
   writing any component. They override anything else, including this file.
3. Static site: semantic HTML + CSS + vanilla JS. No frameworks, no build
   step, no external JS libraries. Google Fonts is the only external resource.
4. One page, one file structure: `index.html`, `tokens.css`, `styles.css`,
   `main.js`, `/assets` for images and favicon.

---

## Anti-slop rules (read twice)

These are the patterns that make a site look AI-generated. All of them are banned:

- **No gradients anywhere.** No gradient text, no gradient buttons, no mesh
  backgrounds, no glassmorphism, no backdrop-blur cards.
- **No emoji as icons.** No 🚀✨🌱 anywhere. Icons, if needed at all, are
  hand-drawn inline SVG (thin stroke, 1.5px, currentColor) — and use at most
  3–4 on the entire page.
- **No generic three-column feature grid with icon-title-paragraph cards** in
  the default look. Our three pillars section exists but must be styled as
  described below (numbered editorial rows, not floating cards).
- **No box-shadows for depth.** Flat surfaces separated by color and hairline
  borders (`--border-default`). Depth comes from the color blocks.
- **No stock photos.** No handshakes, no laptops on desks, no diverse teams
  smiling. The only imagery is typography, color blocks, and (later) real
  product photography for the teaser.
- **No "Lorem ipsum".** All copy is written for real, per the copy section.
- **No centered-everything layout.** The grid is asymmetric and left-anchored
  (see layout). Centering is a deliberate exception, used once (the hero), max twice.
- **No scroll-hijacking, no parallax, no particles, no animated blobs.**
- **No rounded-everything.** Radius only where tokens define it. Large color
  blocks are square-cornered.

---

## Layout system

- Max width `var(--container-max)`, generous side padding `var(--container-pad)`.
- 12-column mental grid, but content is deliberately asymmetric: body text
  columns take 7–8 of 12 columns and sit LEFT. Wide right margins are a
  feature — that's the Tiny-style air.
- Vertical rhythm between sections: `var(--space-6)`. Do not compress.
- Sections alternate backgrounds: paper (hero) → forest (pipeline) → paper (why)
  → lime (pillars) → paper (portfolio) → forest (founder) → paper (contact).
  The lime and forest blocks run FULL BLEED (edge to edge), content stays in
  the container. This banding is the page's visual signature.

---

## Page structure & component specs

### 0. Nav (minimal)
Fixed top, transparent over paper, backdrop turns `--bg-page` with a bottom
hairline after 40px of scroll (JS toggle of a class, CSS transition 200ms).
Left: "DDG" wordmark (mono font, letter-spaced). Right: two text links —
"Portfolio", "Contact" — that smooth-scroll. No hamburger; on mobile the same
two links just shrink. No logo image; the wordmark IS the logo for now.

### 1. Hero — the thesis
- `min-height: 90svh` (not 100 — a full-height hero left a large dead band
  below the button once the thesis got shorter; 90svh keeps the "full
  viewport" feel without the leftover space), content vertically centered.
  `padding-top: var(--space-5)` reserves clearance so the eyebrow never sits
  under the fixed nav on short viewports; matching `padding-bottom`.
- True 50/50 two-part grid (`grid-template-columns: 1fr 1fr`) — the image
  needs to hold visual weight equal to the thesis, not sit as a small square
  in a narrow column. `align-items: stretch` (not `center`): both columns'
  boxes span the exact same height, set by the text column's natural
  height. This is what makes the relationship between text and image
  deliberate instead of two independently-sized blocks that happen to be
  centered — see the visual-block note below for how this plays out.
  On mobile (≤768px) this collapses to one column and the visual block is
  hidden entirely (`display: none`) — at a shrunken size the product photo's
  detail didn't read, and a full-width treatment left the hero fighting the
  thesis for attention with dead space around it either way. The section
  ends on the thesis + button; real product photography returns immediately
  after in the Pipeline strip and again in the Portfolio teaser.
- Left column — eyebrow line first: mono, uppercase, letter-spaced,
  `--text-label`, sage: `CONSUMER BRANDS FOR THE MIDDLE EAST`
- Then the thesis in `--font-display` at `--text-hero`
  (`clamp(3rem, 9vw, 7rem)` — tuned down from an earlier 8rem max so it
  balances against the wider image column instead of dwarfing it), leading
  tight, three short lines: `We build` / `modernized` / `consumer brands.`
  The word `modernized` is italic and colored `--text-accent` (leaf). That
  is the ONLY leaf text in the hero.
- Subline in body font, sage, max-width 44ch:
  `A few legacy players have run these categories for decades, unchallenged.
  We've spent our careers operating inside consumer markets — and we bring
  global-standard positioning, branding, and product quality to categories
  ready for something better.`
- Below, one button (component spec below): `See what we're building` →
  scrolls to Portfolio.
- Signature interaction: the thesis words reveal on load, one line at a time
  (translateY 20px + fade, 80ms stagger, 600ms total, ease-out). This is the
  page's orchestrated text moment. Respect `prefers-reduced-motion`.
- Right column — visual block: real product photography —
  `assets/hero-visual.png` — used **exactly as provided, unmodified**: no
  cropping, no background removal, no recoloring. The source image is its
  own finished composition (a rounded green product card with a white
  margin, cap and other elements deliberately breaking the card's edges) —
  that framing is intentional and must stay intact.
  `.hero__visual` has no `aspect-ratio` of its own — it just takes
  `align-self: stretch` (the grid default, restored after an earlier round
  had it as `align-self: start`) so its box spans exactly the same height as
  the text column. The `<img>` inside is `width:100%; height:100%;
  object-fit: contain; object-position: top` — `contain` (never `cover`)
  means it's never cropped by CSS, and sizes itself as large as its own 1:1
  aspect ratio allows within that box (in practice, width-limited, since the
  column is narrower than the text block is tall). `object-position: top`
  puts the image's own top edge flush against the container's top — which,
  because of the stretch, is the same line the eyebrow starts on. That's the
  deliberate top-edge alignment between text and image. The leftover space
  this leaves below the image (before the button zone's bottom) is a
  constant, intentional gap, not a coincidental near-miss — don't try to
  force it to zero by shrinking the gap further; that was tried and
  over-corrected in both directions (image too small in a narrow column,
  then thesis text too oversized) before landing on 50/50 columns +
  `--text-hero` capped at 7rem as the balance point.
  `.hero__visual`'s own background is `--bg-page` (paper, matching the
  surrounding page), used only as a loading fallback — NOT `--color-forest`
  — since the photo's white margin sits directly on the page background by
  design, not inside a forced forest block. (An earlier attempt at "cleaning
  up" this photo — cropping it and/or replacing
  its white background — was explicitly rejected; don't repeat that.)
  This is the first place on the page brand names become legible (SHIFT,
  CLEAN); Portfolio and Pipeline intentionally stay generic ("Brand 01," no
  name reveal) for now. Reconciling that is deferred to a later round when
  more product photography is added — don't "fix" the inconsistency
  piecemeal in the meantime. `fetchpriority="high"` and no `loading="lazy"`,
  since this is above-the-fold, LCP-critical content. This is the page's
  visual signature moment, alongside the thesis reveal. Static, no entrance
  animation — restraint over piling on a second orchestrated motion.

### 2. Pipeline — what we're building (full-bleed forest, unnumbered)
- Sits immediately after the hero, before the numbered pitch (why → how →
  what → who) starts. Like the hero, it carries no `0N —` eyebrow number —
  it's a teaser, not part of the pitch sequence. This is the page's "what we
  make" moment.
- Full-bleed `--bg-inverse` (forest), text `--text-on-inverse`. Eyebrow
  (lime-colored on forest, no number): `THE PIPELINE`. Heading: `What we're
  building next.`
- A horizontally scrollable strip (native CSS `scroll-snap-type: x
  mandatory`, drag/swipe native via `overflow-x: auto`, no JS drag
  simulation) of 4–5 `--radius-card` cards in a deliberately mixed rhythm —
  not a uniform grid:
  - A **lime card** with a forest-stroke product silhouette (the real,
    filled slot — reuses the bottle/tablet motif for identity consistency).
  - **Paper cards** containing a solid `--color-forest` or `--color-sage`
    color-block placeholder standing in for a photo, each marked with a
    TODO comment to swap in real product photography once available.
  - **Typography-only cards**: background matches the section (forest),
    paper text, with a `--color-paper` hairline border (`--border-default`
    would be invisible forest-on-forest) — the "not yet scoped" open slots.
  - Every card carries a two-line mono label: brand + category (or just the
    brand number, if the category isn't set yet) and a status line
    (`Coming soon` / `In research` / `Open slot`). Together the strip should
    read as a pipeline with filled and waiting slots, not identical cards.
- Prev/next buttons: outline style, `--color-paper` border/icon on this
  forest background (leaf on hover) — not the page's one filled button.
  ≥44px tap target. Native swipe + keyboard-focusable
  (`tabindex="0"` on the scroll container, visible focus outline) +
  `prefers-reduced-motion` respected (instant scroll instead of smooth).

### 3. Why (editorial paragraph)
- Eyebrow: `01 — WHY` (mono). Numbering is meaningful here: the page reads
  as a pitch in numbered order (why → how → what → who).
- One `--text-h2` display heading: `Everyone else sees a monopoly. We see an
  opening.`
- Two short paragraphs, 7-column width, left-anchored. Copy direction: most
  categories in the region are run by a handful of incumbents who haven't
  touched their product or branding in years — that's not a red flag, it's
  proof the demand is already proven; 5 years of experience building and
  repositioning consumer brands is what it takes to walk in and give people
  a reason to switch.

### 4. What we do — three pillars (NOT cards)
- Full-bleed `--bg-section-alt` (lime) band.
- Eyebrow: `02 — HOW`.
- Three rows, not columns. Each row: a huge display-font number rendered as
  text (`01` `02` `03`, forest, ~--text-h2 size) on the left, then pillar name
  in `--text-h3` weight 700, then a one-sentence description in sage.
  Sage hairline separators between rows — `--color-line`/`--border-default`
  is tuned for paper and is nearly invisible on lime; sage is already
  approved for direct use on lime by tokens.css USAGE RULES, rule 4.
- Hover (desktop): the row's background shifts to `--color-lime-soft` is wrong
  on lime — instead, on hover the number slides 8px right and the pillar name
  gets a leaf underline (2px, animated width 0→100%, 250ms). Subtle, tactile.
- Pillars: `Positioning` / `Branding` / `Product quality` — each with one
  sharp sentence, no fluff. No "crowded category" phrasing (that thesis is
  dead) — the edge now is incumbents who never modernized. Weave
  sustainability in honestly where it fits (product quality pillar).

### 5. Portfolio — the teaser
- Eyebrow: `03 — WHAT`. Heading: `What we're launching first.` (plural — the
  section now covers two brands, not one; revised from the earlier singular
  `The first brand.` once SHIFT photography was added alongside CLEAN.)
- Two stacked wide teaser panels (`.teaser-list`, `gap: var(--space-4)`), one
  per brand, each the same full-width card style: `--radius-card`, background
  paper, hairline border, generous padding. (The Pipeline section's cards
  also use `--radius-card`, but as a horizontal scroll strip of small
  mixed-style placeholders, not a static grid — it reads as a different
  pattern, not a repeat of this one.)
- Card 1 — CLEAN: tag pill `COMING SOON` (`--tag-bg`/`--tag-text`, mono,
  uppercase); brand-line: `CLEAN — Personal care`; one teaser sentence:
  `A foaming hand soap that ships as a tablet. The bottle you already own,
  refilled without the plastic.` Brand names are revealed here, matching the
  hero visual and real product photography — the earlier "stay generic" rule
  assumed no real photography existed yet. Photo: `assets/brand-01-product.jpg`.
- Card 2 — SHIFT: same structure, tag `COMING SOON`, brand-line:
  `SHIFT — Personal care`; sentence: `A daily deodorant for sensitive skin,
  in three colors worth leaving out on the counter.` Photo:
  `assets/brand-02-product.jpg`.
- Each card's photo (`.teaser__photo`): `--radius-card`, `object-fit: cover`,
  `aspect-ratio: 1/1`, max-width 220px, sitting right of the copy on desktop
  (`align-items: center` on the card). Replaces the earlier abstract SVG
  bottle placeholder now that real product photography exists — no SVG, no
  tablet-drop animation.
  - Mobile (≤768px): the photo bleeds full-width to the card's top edge
    (negative margin equal to the card's own padding, `align-self: stretch`,
    top corners keep `--radius-card`, bottom corners square) instead of
    sitting small and left-aligned above the copy — a small fixed-width photo
    read as disconnected from the card around it; full-bleed reads as one
    unit.
- Below the panels, one mono line, sage: `Brands 03–05 in research.` (CLEAN
  and SHIFT are both now shown above, so the "in research" count starts at 03.)

### 6. Who we are — full-bleed forest block
- Full-bleed `--bg-inverse`, text `--text-on-inverse`.
- Eyebrow: `04 — WHO` (lime-colored on forest).
- **One shared letter**, written "we" not "I" — three partners, one voice.
  Display font at ~1.5rem, max 60ch, 5–7 sentences: why the Middle East, why
  now (concentrated markets, stale incumbents, proven demand), what we
  refuse to compromise on, what a manufacturing partner can expect
  (long-term, quality-obsessed, direct).
- **Signature row** below the letter: 3 slots side by side
  (`grid-template-columns: repeat(3, 1fr)`, stacking to 1 column ≤768px) —
  Dor Muallem, Gal Razon, Dor Netz. Each name in italic display font at
  `--text-h3` (a handwritten-style placeholder) with `Co-founder` in mono,
  lime-colored (sage isn't valid on forest per tokens.css rule 4), beneath.
  TODO comment per slot: replace with a real signature SVG.
- A hairline divider (`--color-paper` — `--border-default` is tuned for
  paper and disappears on forest, same fix already used for the pipeline
  section's typography cards).
- **Founder cards row** below the divider: static (no carousel, everything
  visible on scroll), same 3-column grid stacking to 1 column ≤768px. Each
  card: a square `--color-paper` color-block photo placeholder (TODO: real
  photo, no radius — flat, square-cornered), name, `Co-founder` in mono
  (lime), and one short sharp belief line per founder (no fluff, no banned
  words, distinct per person).
- Flat blocks throughout — no shadows, no new colors beyond the existing
  palette.

### 7. Contact / footer
- Back on paper. One display-font line: `Got a category that needs waking
  up? Talk to us.`
- Email as a large text link: `hello@ddgholdings.com` (placeholder — TODO
  comment: replace with real Zoho address) with the leaf underline hover.
- Small print row: `DDG Holdings` · year · LinkedIn text link (TODO href).
- No forms. No newsletter signup.

---

## Shared component specs

**Button** — forest bg, paper text, `--radius-btn`, padding 14px 28px, body
font weight 500. Hover: bg `--btn-bg-hover` + translateY(-1px), 150ms. Active:
translateY(0). Focus-visible: 2px leaf outline, 2px offset. That's it — one
button style exists on this page.

**Link** — ink text, 1.5px underline in `--color-line`; on hover the underline
becomes leaf and thickens to 2px (background-image trick or border-bottom,
150ms). On forest background: paper text, lime underline on hover.

**Tag / pill** — mono, uppercase, `--text-label`, tracking `--tracking-label`,
`--tag-bg` + `--tag-text`, `--radius-tag`, padding 6px 14px.

**Eyebrow** — mono, uppercase, letter-spaced, `--text-label`, sage (or lime
on forest). Always the first element of a section. The `0N — WORD` pattern.

**Section reveal** — every section's content fades in + rises 16px when it
enters the viewport (IntersectionObserver, threshold 0.15, once). 500ms
ease-out, no stagger except the hero. Wrap in a
`@media (prefers-reduced-motion: reduce)` opt-out that shows everything
statically.

---

## Copy rules

- Sentence case. Short sentences. Verbs over adjectives.
- Banned words: `solutions`, `innovative`, `passionate`, `synergy`,
  `cutting-edge`, `world-class`, `seamless`, `leverage`, `empower`, `journey`.
- Numbers beat claims: where a real number exists (years of experience,
  markets entered), use it; otherwise leave a `[N]` placeholder with a TODO —
  never invent statistics.
- Every section headline must be readable as a standalone statement of belief.

---

## Technical floor (verify before calling it done)

- Responsive: flawless at 360px, 768px, 1024px, 1440px, and one ultra-wide
  pass (1920px+). Hero thesis must never overflow or hyphenate awkwardly —
  tune `clamp()` if needed. No horizontal scroll anywhere. Tap targets ≥44px.
  Carousel on mobile: natural swipe, correct snap, visible peek of the next
  card.
- Semantic HTML: one `h1` (the thesis), sections with `h2`, landmarks
  (`header`, `main`, `footer`), skip-link.
- Keyboard: visible focus states on all interactive elements, including the
  carousel's scroll container (`tabindex="0"` + focus outline), not just its
  prev/next buttons.
- `prefers-reduced-motion` respected on every animation.
- Head: title `DDG Holdings — Consumer brands for the Middle East`,
  meta description, OG title/description/image (create a simple 1200×630
  OG image as SVG-rendered-to-PNG or leave a clearly marked TODO),
  favicon (simple: forest square with paper "DDG" mono letters, as SVG).
- Lighthouse targets: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95.
  Actually run it (or explain what to check manually) before finishing.
- No console errors. Test the JS with the network throttled — the page must
  be fully readable before/without JS.

## Workflow expectations

- Build section by section in the order above. After each section, pause and
  self-critique against the anti-slop rules before moving on.
- When in doubt between "impressive" and "restrained" — choose restrained.
  The signature moments are already chosen (hero thesis reveal, hero visual
  block, tablet-drop SVG, pillar hover). The pipeline carousel is
  deliberately NOT animated beyond native scroll-snap — it does not compete
  for attention as a fifth moment. Do not add more beyond this list.
