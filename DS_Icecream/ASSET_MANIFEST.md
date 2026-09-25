# Palmé Production Asset Manifest

> Last updated: 2026-09-25 16:21:27 UTC+07:00

## Objective

Keep every visual asset traceable and prevent approved Palmé artwork from being regenerated or silently replaced.

## Status Workflow

- `missing`: no usable file exists.
- `candidate`: available for visual review but not approved.
- `approved`: accepted for use in the website.
- `locked`: approved production asset; do not regenerate, overwrite, recolor, crop destructively, or replace without explicit approval.

## Usage Rules

1. The supplied mockups are art direction only. Do not crop them into website assets.
2. Generated assets must contain no text, logo, signature, or watermark unless the exact artwork is supplied separately.
3. Keep source imagery separate from HTML/CSS/SVG decoration.
4. Store final files under `public/assets/` using the paths below.
5. Create a versioned sibling such as `hero-beach-cafe-v2.webp` when proposing a replacement for an approved or locked file.

## Asset Register

| Area | Production path | Type | Status | Requirements |
| --- | --- | --- | --- | --- |
| Brand | `public/assets/brand/palme-logo.svg` | SVG | missing | Official red Palmé wordmark supplied or approved by the owner |
| Brand | `public/assets/fonts/palme-script.woff2` | Font | missing | Licensed webfont matching the approved script lettering |
| Hero | `public/assets/hero/hero-beach-cafe.png` | Photograph | locked | Previous approved Hero retained for rollback; superseded by v4 |
| Hero | `public/assets/hero-beach-cafe.png` | Photograph | candidate | Existing 1672×941 concept; contains a watermark and does not match the approved storefront |
| Hero | `public/assets/candidates/hero/hero-beach-cafe-v2.png` | Photograph | candidate | Original wide storefront candidate with clean left-side copy space; no embedded text |
| Hero | `public/assets/candidates/hero/hero-beach-cafe-v3.png` | Photograph | candidate | Earlier reference-aligned storefront candidate with blank wall and chalkboard |
| Hero | `public/assets/hero/hero-beach-cafe-v4.png` | Photograph | locked | Owner-approved storefront with embedded wall and chalkboard wording; current production Hero |
| Hero mobile | `public/assets/candidates/hero/hero-beach-cafe-mobile-v1.png` | Photograph | candidate | Portrait derivative of locked Hero v4; preserves full wall and chalkboard copy for screens up to 600px |
| Flavors | `public/assets/flavors/vanilla-dream.png` | Transparent product | locked | Approved vanilla scoop and pale tray |
| Flavors | `public/assets/flavors/strawberry-bliss.png` | Transparent product | locked | Approved strawberry scoop and pink tray |
| Flavors | `public/assets/flavors/mint-cloud.png` | Transparent product | locked | Approved mint chocolate-chip scoop and aqua tray |
| Flavors | `public/assets/flavors/mango-summer.png` | Transparent product | locked | Approved mango scoop and yellow tray |
| Flavors | `public/assets/candidates/flavors/*-v1.png` | Transparent products | candidate | Four original product cutouts used in the current preview; preserve alpha |
| Flavor detail | `public/assets/flavor-backgrounds/vanilla-dream.png` | Photograph | locked | Owner-approved vanilla background; clean copy zone and softened ingredient cues |
| Flavor detail | `public/assets/flavor-backgrounds/strawberry-bliss.png` | Photograph | locked | Owner-approved strawberry background; scattered berries remain subordinate to the product |
| Flavor detail | `public/assets/flavor-backgrounds/mint-cloud.png` | Photograph | locked | Owner-approved mint background; softened mint and chocolate cues |
| Flavor detail | `public/assets/flavor-backgrounds/mango-summer.png` | Photograph | locked | Owner-approved mango background; softened mango cues remain subordinate to the product |
| Events | `public/assets/events/white-summer.png` | Photograph | locked | Owner-approved White Summer campaign photograph; do not regenerate or replace |
| Story | `public/assets/story/shop-exterior.png` | Photograph | candidate | Yellow-white awning storefront, no generated brand text |
| Story | `public/assets/story/beach.png` | Photograph | candidate | Supporting tropical beach image |
| Atmosphere | `public/assets/atmosphere/overview.png` | Photograph | candidate | Wide yellow-white beach café terrace |
| Atmosphere | `public/assets/atmosphere/indoor.png` | Photograph | candidate | Warm indoor café scene |
| Atmosphere | `public/assets/atmosphere/counter.png` | Photograph | candidate | Ice-cream counter scene |
| Atmosphere | `public/assets/atmosphere/outdoor.png` | Photograph | candidate | Open-air seating and sea breeze |
| Atmosphere | `public/assets/atmosphere/beach.png` | Photograph | candidate | Beach-facing scene |
| Moments | `public/assets/moments/moment-01.png` … `moment-06.png` | Photographs | locked | Owner-approved six-image social gallery; preserve the complete set and ordering |

## Dependencies

- Next.js Image handles responsive delivery.
- CSS controls masks, overlays, borders, waves, layout, and motion.
- Final logo and font usage depends on owner-supplied/licensed files.

## Configuration

Asset paths are mapped in `src/data/content.ts`. Candidate files must not replace approved paths until approval.

## Usage Example

```tsx
<Image src="/assets/flavors/strawberry-bliss.png" alt="Strawberry Bliss ice cream" fill />
```

## Limitations

- Generated photography cannot guarantee an exact real-world storefront.
- Brand spelling and logo fidelity require official vector artwork.
- Candidate story, atmosphere, mobile Hero, logo, and font assets still require review or owner-supplied artwork.
