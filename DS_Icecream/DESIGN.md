# Design System

## Direction

Reconstruct the supplied Palmé mockup through layout, typography, CSS, and production assets from `public/assets/`. The mockup is never cropped or used as an image source.

## Color

- Cream: `oklch(0.975 0.028 88)`
- Pastel Blue: `oklch(0.876 0.057 231)`
- Sky Blue: `oklch(0.824 0.091 231)`
- Butter Yellow: `oklch(0.865 0.135 91)`
- Deep Ocean Blue: `oklch(0.442 0.119 238)`
- Palmé Red: `oklch(0.489 0.184 26)`
- Ink: `oklch(0.31 0.075 241)`

## Typography

- Display: humanist/editorial serif with generous Thai fallback.
- Body and navigation: clean Thai-compatible sans-serif.
- Script: short decorative phrases only; production font file is currently missing.

## Layout

- Maximum content width: 1180px.
- 4px-based spacing scale with section gaps from 64–112px.
- Wide editorial desktop composition, simplified two-column tablet layout, single-column mobile layout.
- Card radii remain between 12–16px; image masks may use custom organic curves.

## Components

Header, Hero, SectionIntro, FlavorShelf, CampaignFeature, StoryPreview, AtmospherePreview, MomentsStrip, Button, MediaPlaceholder, and Footer.

## Motion

Phase 3 includes only hover, focus, and short color/transform transitions. Ambient motion, reveal choreography, and scene transitions remain deferred until visual approval. Reduced motion disables non-essential transitions.
