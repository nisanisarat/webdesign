# Lotus Pavilion Implementation Plan

## Objective

แปลงภาพอ้างอิงที่อนุมัติแล้วใน `design-references/` ให้เป็นเว็บไซต์ Next.js + TypeScript แบบสองภาษา Responsive และเข้าถึงได้ โดยทุก Route, CTA, Hotspot และสถานะมีการทำงานรองรับ

## Scope

### Included

- Home, Garden, Pavilion, Seasons, Gallery, Journal, Article, Visit และ Search
- ภาษาไทยและอังกฤษ
- Responsive ตั้งแต่ประมาณ `320px` ถึงจอขนาดใหญ่
- Keyboard, Touch และ Mouse
- Reduced motion
- Ambient water audio แบบผู้ใช้สั่งเล่น
- Calendar `.ics`
- Coming-soon feedback สำหรับ Integration ที่ยังไม่มี Backend

### Excluded until real data is supplied

- Payment
- User account
- Server-side favorites
- Real mailing-list integration
- Real booking capacity
- Real map and directions integration

## Workflow

1. สร้าง Project shell และ Design tokens
2. สร้าง Global layout, Navigation, Footer, Language switcher และ Focus system
3. สร้าง Route และ Static content contract
4. สร้าง Home และ Shared interaction primitives
5. สร้าง Detail pages ตามลำดับ Garden, Pavilion, Seasons, Gallery, Visit, Journal/Search
6. เพิ่ม Audio, Calendar และ Coming-soon feedback
7. ทดสอบ Responsive, Accessibility, Navigation และ Performance
8. ตรวจด้วยภาพ Screenshot เทียบ `design-references/`

## Application Structure

```text
DS_LotusChaina/
├── public/
│   ├── audio/
│   │   └── pond-water.mp3
│   ├── images/
│   │   ├── home/
│   │   ├── garden/
│   │   ├── pavilion/
│   │   ├── seasons/
│   │   ├── gallery/
│   │   ├── journal/
│   │   └── visit/
│   ├── textures/
│   └── icons/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── page.tsx
│   │       ├── garden/page.tsx
│   │       ├── pavilion/page.tsx
│   │       ├── seasons/page.tsx
│   │       ├── gallery/page.tsx
│   │       ├── journal/page.tsx
│   │       ├── journal/[slug]/page.tsx
│   │       ├── visit/page.tsx
│   │       └── search/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── ui/
│   │   ├── audio/
│   │   └── motion/
│   ├── features/
│   │   ├── garden/
│   │   ├── pavilion/
│   │   ├── seasons/
│   │   ├── gallery/
│   │   ├── journal/
│   │   ├── search/
│   │   └── visit/
│   ├── content/journal/
│   ├── messages/
│   │   ├── th.json
│   │   └── en.json
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── globals.css
│   │   └── motion.css
│   └── lib/
│       ├── routes.ts
│       ├── search.ts
│       ├── calendar.ts
│       └── storage.ts
├── tests/
│   ├── navigation/
│   ├── interactions/
│   ├── responsive/
│   └── accessibility/
├── PRODUCT.md
├── DESIGN.md
└── IMPLEMENTATION-PLAN.md
```

## Route Contract

| Route | Purpose | Primary entry |
|---|---|---|
| `/[locale]` | Home | Logo / Home |
| `/[locale]/garden` | Living Pond | Explore the Garden |
| `/[locale]/garden?view=story` | Story entry state | Our Story |
| `/[locale]/pavilion` | Five pavilion views | Experience More |
| `/[locale]/seasons` | Seasonal dial | Seasons |
| `/[locale]/seasons?season=<name>` | Selected season | Season label |
| `/[locale]/gallery` | Reflection archive | View Gallery |
| `/[locale]/gallery?work=<id>` | Open artwork state | Gallery item |
| `/[locale]/journal` | Journal index | Journal |
| `/[locale]/journal/[slug]` | Article | Read Story |
| `/[locale]/visit` | Visit planner | Visit Us / Plan Your Visit |
| `/[locale]/search?q=<term>` | Shareable search | Search dialog |

## Interaction Contract

### Global

- Logo and Home navigate to locale Home
- Language switch preserves current Route, Query and Hash
- Search opens a full-screen Dialog and supports initial, typing, loading, results, empty and error states
- Mobile navigation uses Focus trap and returns Focus when closed
- Placeholder integrations open an accessible Coming-soon Dialog

### Home

- Explore the Garden opens Garden at default state
- Our Story opens Garden with `view=story`
- Experience More opens Pavilion
- Season labels open the selected Season state
- View Gallery opens Gallery
- Plan Your Visit opens Visit

### Garden

- Canopy, Bloom and Below Water synchronize map markers and progress rail
- Leaves, Stems, Roots and Life Below open Detail Drawer or Bottom sheet
- Bud–Bloom–Seed supports slider, play, pause and reduced-motion states
- Anatomy items open detail content
- Listen to the Pond controls Audio without autoplay
- Continue to Pavilion and Return to Garden navigate normally

### Pavilion

- Lake, Garden, Tea Room, Roof and Night switch the active view
- Structure hotspots open Detail Drawer
- Time scrubber changes Dawn, Noon, Dusk and Night
- Plan Your Visit opens Visit
- Next Story opens Seasons

### Seasons

- Dial, buttons and keyboard arrows select the same active season
- Compare lens supports Drag and keyboard controls
- Listen controls the season ambience
- Botanical Calendar opens expanded detail
- Gallery CTA opens Gallery filtered by season

### Gallery

- Filters update the active collection
- Desktop uses horizontal drag; Mobile defaults to Contact sheet
- Artwork opens Lightbox with Zoom, Previous, Next and Close
- Save and Share show Coming-soon feedback initially
- Continue to Journal and Plan Your Visit have Route destinations

### Visit

- Flow is Date → Arrival → Your Visit → Review → Confirm → Success
- No payment is collected
- Get Directions and Download Map show Coming-soon feedback initially
- Add to Calendar generates `.ics`
- Email Details and Change Visit show Coming-soon feedback initially

### Journal and Search

- Filters update journal groups
- Load More adds results without losing scroll position
- Article supports Previous, Next and Related Story links
- Subscribe shows Coming-soon feedback initially
- Search result groups link to Pages, Journal and Gallery
- Result and Empty states are mutually exclusive

## Responsive Matrix

| Capability | Mobile | Tablet | Desktop / Large |
|---|---|---|---|
| Navigation | Full-screen menu | Compact menu when needed | Inline header |
| Detail overlay | Bottom sheet | Bottom sheet / drawer | Side drawer |
| Garden map | Map plus text list | Interactive map | Full map with parallax |
| Season dial | Swipe plus buttons | Reduced dial | Full dial and scrubber |
| Gallery | Contact sheet default | Scroll snap | Immersive horizontal drag |
| Visit | One step at a time | Two-column where possible | Full journey overview |
| Search | Full-screen | Full-screen | Centered full-screen composition |
| Motion | Reduced layers | Moderate layers | Full choreography |

Content breakpoints are authoritative; initial implementation targets are `480px`, `768px` and `1200px` and must be adjusted if content clips or becomes unreadable

## Components

- `SiteHeader`, `SiteFooter`, `MobileNavigation`, `LanguageSwitcher`
- `PrimaryButton`, `SecondaryButton`, `ComingSoonDialog`
- `Dialog`, `Drawer`, `BottomSheet`, `Lightbox`, `Toast`
- `AmbientAudioPlayer`, `MotionPreferenceProvider`
- `LivingPondMarker`, `StoryProgressRail`, `BloomTimeline`
- `PavilionViewSelector`, `TimeOfDayScrubber`
- `SeasonDial`, `SeasonCompareLens`
- `ReflectionGallery`, `GalleryFilters`
- `VisitStepper`, `VisitCalendar`, `VisitSummary`
- `JournalIndex`, `ArticleNavigation`, `SearchDialog`

## Assets

### Reference only

- `design-references/home-page-reference.png`
- `design-references/garden-page-reference.png`
- `design-references/pavilion-page-reference.png`
- `design-references/seasons-page-reference.png`
- `design-references/gallery-page-reference.png`
- `design-references/visit-page-reference.png`
- `design-references/journal-search-page-reference.png`

### Production assets required

- Hero backgrounds per Route
- Separate foreground, middle-ground and background lotus leaves
- Bud, bloom, petal and seed-pod states
- Above-water and underwater scenes
- Pavilion exterior, interior, tea room and time-of-day scenes
- Four-season environment images
- Gallery originals and thumbnails
- Paper and ink textures
- SVG logo and interface icons
- Mobile and reduced-motion poster images
- Licensed water ambience audio

## Dependencies

### Required

- Next.js, React and TypeScript
- Project-native linting and testing tools

### Proposed, subject to implementation review

- Internationalization routing and message loading
- A motion library only for choreography that cannot be implemented clearly with CSS or Web Animations API
- Browser testing and accessibility tooling

No dependency is installed by this plan

## Configuration

- Public site name: `Lotus Pavilion`
- Internal directory: `DS_LotusChaina`
- Locales: `th`, `en`
- Default locale: `th`
- Visit mode: request only
- Audio autoplay: disabled
- Search scope: Pages, Journal, Gallery
- Save, Share, Subscribe and Map integration: Coming-soon state

## Audio

- Default sound is a licensed flowing-water ambience
- Chinese instrumental music is optional and always user-initiated
- Provide Play, Pause, Mute and Volume
- Lazy-load audio near the audio section
- Persist volume locally but never persist forced playback
- Show an unavailable state if the source fails

## Verification

### Functional

- Every visible control has a Route, state change or feedback
- No empty `href`, dead button or inaccessible Click-only container
- Back and Forward restore meaningful state for Query-driven views
- Locale switching preserves the current page and selection

### Responsive

- Test representative widths from `320px` through large desktop
- Test portrait and landscape
- Verify no text, heading or control overflows
- Verify touch targets and sticky elements do not overlap content

### Accessibility

- Keyboard-only navigation
- Focus order and visible Focus
- Dialog focus trap and Focus return
- Reduced motion
- Color contrast
- Alt text and language metadata
- Audio never autoplays

### Performance

- Responsive images with explicit dimensions
- Lazy-load below-fold media
- Limit expensive filters and parallax layers
- Verify animation smoothness on a mid-range mobile device

## Implementation Phases

1. Foundation and tokens
2. Global navigation, localization and accessibility primitives
3. Home
4. Garden
5. Pavilion and Seasons
6. Gallery
7. Visit
8. Journal and Search
9. Audio and Calendar
10. Cross-browser, responsive, accessibility and performance verification

## Usage Example

นักพัฒนาเปิด `DESIGN.md` เพื่อใช้สี Typography และ Component rules จากนั้นเทียบหน้า Home กับ `design-references/home-page-reference.png` และตรวจ Route/State ตาม Interaction Contract ก่อนส่งงาน

## Acceptance Criteria

- ทุก Route ใน Route Contract เปิดได้ทั้ง `th` และ `en`
- ทุกปุ่มใน Interaction Contract ให้ผลตอบสนอง
- ทุกหน้าผ่านการตรวจ Mobile, Tablet และ Desktop
- Reduced-motion ใช้งานได้
- Visit มี Review และ Confirm ก่อน Success
- Search ไม่แสดง Results และ Empty state พร้อมกัน
- ชื่อ `DS_LotusChaina` ไม่ปรากฏต่อผู้ใช้
- ภาพ Reference ไม่ถูกนำไปใช้เป็น Screenshot แทนหน้าเว็บจริง

## Limitations

- Real content, business details and verified botanical facts are pending
- Exact animation performance cannot be confirmed until implementation exists
- Real booking, mailing list, maps, favorites and sharing integrations are deferred
- The final audio file must be selected, downloaded and retained with its license record during implementation
