# Missing Production Assets

> Last updated: 2026-09-25 16:21:27 UTC+07:00

## Objective

Track only assets that still block the approved Palmé experience. See `ASSET_MANIFEST.md` for lifecycle and replacement rules.

## Missing

- Official Palmé logo SVG.
- Licensed Palmé script font.
- Final approval for the storefront and supporting beach photographs.
- Final approval for five atmosphere photographs.

## Candidate Requiring Review

- `public/assets/candidates/hero/hero-beach-cafe-mobile-v1.png` — portrait Hero derivative currently used for mobile Preview; requires owner approval before promotion.
- `public/assets/hero-beach-cafe.png` — 1672×941. It has useful left-side copy space but contains a watermark and does not reproduce the approved storefront composition. Do not promote it to an approved path.
- `public/assets/candidates/hero/hero-beach-cafe-v2.png` — clean original storefront composition used in the preview.
- `public/assets/candidates/hero/hero-beach-cafe-v3.png` — earlier reference-aligned storefront candidate with blank wall and chalkboard.
- `public/assets/candidates/flavors/*-v1.png` — four transparent flavor cutouts used in the preview.
- `public/assets/story/*.png` — Phase 2 story candidates.
- `public/assets/atmosphere/*.png` — Phase 2 atmosphere candidates.

## Workflow

1. Generate or supply one candidate asset.
2. Review composition, subject, artifacts, text, logo, and watermark.
3. Mark it `approved` in `ASSET_MANIFEST.md` only after owner approval.
4. Move it to its canonical production path and mark it `locked`.
5. Never regenerate or overwrite a locked asset without explicit approval.

## Dependencies

- The official logo and licensed script font must come from the brand owner.
- Generated photographs must contain no embedded typography or logos.

## Configuration

Canonical paths are defined in `ASSET_MANIFEST.md` and consumed from `src/data/content.ts`.

## Usage Example

Review the Hero candidate first, then update the manifest status before changing the code path.

## Limitations

The approved mockup is art direction rather than a source image. It must not be cropped into production assets.
