"use client";

// USING GLOBAL CSS: [src/app/globals.css]
import { flavors, locations, moments } from "@/data/content";
import { useEffect, useRef, useState } from "react";
import type { WheelEvent as ReactWheelEvent } from "react";
import { Header } from "./header";
import { MediaPlaceholder } from "./media-placeholder";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

const storyChapters = [
  {
    tab: "The Beginning",
    title: <>Small Shop<br />Big Happiness</>,
    body: "จากความรักในไอศกรีมและบรรยากาศริมทะเล เราอยากให้ทุกคนได้พักและมีความสุขเล็ก ๆ ในทุกวัน",
    mainAsset: "/assets/story/shop-exterior.png",
    mainAlt: "Palmé shop",
    smallAsset: "/assets/story/beach.png",
    smallAlt: "Palmé beach",
    note: <>A sweet story<br />since 2020</>,
  },
  {
    tab: "Our Ice Cream",
    title: <>Made Slowly<br />Shared Happily</>,
    body: "เราเลือกวัตถุดิบอย่างตั้งใจ ทำไอศกรีมทีละชุดเล็ก ๆ เพื่อให้ทุกรสชาติสดใหม่ เนียนนุ่ม และเต็มไปด้วยความสุข",
    mainAsset: "/assets/flavors/strawberry-bliss.png",
    mainAlt: "Palmé strawberry ice cream",
    smallAsset: "/assets/story/shop-exterior.png",
    smallAlt: "Palmé shop",
    note: <>Made with care<br />served with joy ♡</>,
  },
  {
    tab: "Beach Life",
    title: <>Sunshine, Sea<br />& Sweet Moments</>,
    body: "เสียงคลื่น ลมทะเล และโต๊ะตัวโปรดหน้าร้าน คือส่วนผสมที่ทำให้ไอศกรีมหนึ่งถ้วยกลายเป็นความทรงจำดี ๆ",
    mainAsset: "/assets/story/beach.png",
    mainAlt: "Palmé beach life",
    smallAsset: "/assets/story/shop-exterior.png",
    smallAlt: "Palmé shop",
    note: <>Slow down<br />stay awhile</>,
  },
  {
    tab: "Palmé Today",
    title: <>Good Days<br />Growing Together</>,
    body: "วันนี้ Palmé ยังเป็นร้านเล็ก ๆ ที่อยากแบ่งปันรสชาติสดใส พื้นที่สบายใจ และวันดี ๆ ให้กับทุกคนที่แวะมา",
    mainAsset: "/assets/story/shop-exterior.png",
    mainAlt: "Palmé today",
    smallAsset: "/assets/story/beach.png",
    smallAlt: "Palmé beach",
    note: <>Good people<br />good days ♡</>,
  },
];

export function Homepage() {
  const [activeScene, setActiveScene] = useState<"flavor" | "story" | "beach" | "event" | "gallery" | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState(1);
  const [flavorDirection, setFlavorDirection] = useState<-1 | 1>(1);
  const [storyChapter, setStoryChapter] = useState(0);
  const [beachLocation, setBeachLocation] = useState(0);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [galleryMoment, setGalleryMoment] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const flavorShelfRef = useRef<HTMLDivElement>(null);
  const momentsStripRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const flavorWheelLockRef = useRef(false);
  const flavorWheelDeltaRef = useRef(0);

  useEffect(() => {
    if (!activeScene) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setActiveScene(null);
    document.body.classList.add("scene-open");
    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();
    return () => {
      document.body.classList.remove("scene-open");
      window.removeEventListener("keydown", closeOnEscape);
      previousFocusRef.current?.focus();
    };
  }, [activeScene]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animatedElements = document.querySelectorAll<HTMLElement>("[data-motion]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const motion = element.dataset.motion;

        if (motion === "stagger") {
          Array.from(element.children).slice(0, 8).forEach((child, index) => {
            child.animate(
              [{ opacity: .45, transform: "translateY(1.25rem) scale(.97)" }, { opacity: 1, transform: "translateY(0) scale(1)" }],
              { duration: 520, delay: index * 55, easing: "cubic-bezier(.16, 1, .3, 1)" },
            );
          });
        } else {
          const isImage = motion === "image";
          element.animate(
            isImage
              ? [{ opacity: .65, clipPath: "inset(4% 4% 4% 4% round 14px)", transform: "scale(.985)" }, { opacity: 1, clipPath: "inset(0 round 0)", transform: "scale(1)" }]
              : [{ opacity: .45, filter: "blur(3px)", transform: "translateY(1.5rem)" }, { opacity: 1, filter: "blur(0)", transform: "translateY(0)" }],
            { duration: isImage ? 680 : 560, easing: "cubic-bezier(.16, 1, .3, 1)" },
          );
        }

        observer.unobserve(element);
      });
    }, { threshold: .18, rootMargin: "0px 0px -8%" });

    animatedElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const openFlavor = (index: number) => {
    setFlavorDirection(index >= selectedFlavor ? 1 : -1);
    setSelectedFlavor(index);
    setActiveScene("flavor");
  };

  const changeFlavor = (direction: -1 | 1) => {
    setFlavorDirection(direction);
    setSelectedFlavor((current) => (current + direction + flavors.length) % flavors.length);
  };

  const handleFlavorWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(min-width: 861px)").matches || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();
    if (flavorWheelLockRef.current) return;

    flavorWheelDeltaRef.current += event.deltaY;
    if (Math.abs(flavorWheelDeltaRef.current) < 48) return;

    changeFlavor(flavorWheelDeltaRef.current > 0 ? 1 : -1);
    flavorWheelDeltaRef.current = 0;
    flavorWheelLockRef.current = true;
    window.setTimeout(() => { flavorWheelLockRef.current = false; }, 560);
  };

  const scrollFlavors = (direction: -1 | 1) => {
    const shelf = flavorShelfRef.current;
    if (!shelf) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    shelf.scrollBy({ left: direction * shelf.clientWidth * 0.78, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const scrollMoments = (direction: -1 | 1) => {
    const strip = momentsStripRef.current;
    if (!strip) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.64, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const changeGalleryMoment = (direction: -1 | 1) => {
    setGalleryMoment((current) => (current + direction + moments.length) % moments.length);
  };

  return (
    <>
    <main>
      <section className="hero" id="home">
        <MediaPlaceholder
          src="/assets/hero/hero-beach-cafe-v4.png"
          alt="Palmé Beach Bar beside the sea"
          label="Hero beach café photograph"
          className="hero__media"
          priority
          mobileSrc="/assets/candidates/hero/hero-beach-cafe-mobile-v1.png"
        />
        <Header />
        <div className="hero__content">
          <p className="script-line hero__slogan"><span>Good</span><span>Ice Cream</span><span>Brighter Days</span></p>
          <p className="hero__thai">ไอศกรีมดี ๆ<br />ทำให้ทุกวันสดใสขึ้น</p>
          <a className="button" href="#flavors">Discover Our Menu <Arrow /></a>
        </div>
        <a className="scroll-cue" href="#flavors">Scroll <span aria-hidden="true">↓</span></a>
      </section>

      <section className="section flavors" id="flavors">
        <div className="section-heading section-heading--center" data-motion="copy">
          <h2>Our Flavors</h2>
          <p>ไอศกรีมโฮมเมด รสชาติที่มาจากความสุข</p>
        </div>
        <div className="flavor-carousel">
          <button className="carousel-control carousel-control--previous" type="button" onClick={() => scrollFlavors(-1)} aria-label="Previous flavor">←</button>
        <div className="flavor-shelf" ref={flavorShelfRef} data-motion="stagger">
          {flavors.map((flavor, index) => (
            <article className={`flavor flavor--${flavor.tone}`} key={flavor.name}>
              <button className="flavor__button" type="button" onClick={() => openFlavor(index)} aria-label={`Open ${flavor.name} details`}>
                <MediaPlaceholder src={flavor.asset} alt={`${flavor.name} ice cream`} label={`${flavor.name} product photo`} sizes="(max-width: 700px) 70vw, 22vw" />
                <h3>{flavor.name}</h3>
                <p>{flavor.nameTh}</p>
              </button>
            </article>
          ))}
        </div>
          <button className="carousel-control carousel-control--next" type="button" onClick={() => scrollFlavors(1)} aria-label="Next flavor">→</button>
          <p className="flavor-prompt" aria-hidden="true">Pick your<br />Happiness ♡</p>
        </div>
        <div className="section-action"><button className="button button--outline" type="button" onClick={() => openFlavor(0)}>View All Flavors <Arrow /></button></div>
      </section>

      <section className="section section--tight campaign" id="events">
        <div className="section-heading" data-motion="copy"><h2>What&apos;s On</h2><p>กิจกรรมและเมนูพิเศษประจำฤดูกาล</p></div>
        <div className="campaign__panel" data-motion="image">
          <MediaPlaceholder src="/assets/events/white-summer.png" alt="White Summer ice cream by the sea" label="White Summer campaign photograph" />
          <MediaPlaceholder src="/assets/story/beach.png" alt="Palm trees beside the White Summer beach" label="White Summer supporting beach photograph" className="campaign__postcard" sizes="(max-width: 600px) 1px, 23vw" />
          <div className="campaign__badge" aria-hidden="true"><span>Summer</span><strong>Beach Bar</strong></div>
          <div className="campaign__copy">
            <p className="script-line script-line--small">White Summer &apos;26</p>
            <p className="campaign__list">Special menu<br />Beach vibes<br />Sweet moments</p>
            <button className="button" type="button" onClick={() => setActiveScene("event")}>Explore Event <Arrow /></button>
          </div>
        </div>
      </section>

      <section className="section story" id="story">
        <div className="story__copy" data-motion="copy">
          <div className="section-heading"><h2>Our Story</h2><p>เรื่องราวของ Palmé</p></div>
          <h3>Small Shop<br />Big Happiness</h3>
          <p>จากไอศกรีมเล็ก ๆ ริมทะเล สู่พื้นที่แห่งความสุขของทุกคน</p>
          <button className="button button--outline" type="button" onClick={() => setActiveScene("story")}>Explore Our Story <Arrow /></button>
        </div>
        <div className="story__collage" data-motion="image">
          <MediaPlaceholder src="/assets/story/shop-exterior.png" alt="Palmé beach shop exterior" label="Palmé storefront photograph" className="story__photo story__photo--main" sizes="45vw" />
          <MediaPlaceholder src="/assets/story/beach.png" alt="Beach near Palmé" label="Supporting beach photograph" className="story__photo story__photo--small" sizes="24vw" />
          <div className="story__note">Good people<br />Good ice cream<br />Good days ♡</div>
        </div>
      </section>

      <section className="section atmosphere">
        <div className="section-heading" data-motion="copy"><h2>The Atmosphere</h2><p>บรรยากาศที่มากกว่าแค่ร้านไอศกรีม</p></div>
        <div className="atmosphere__frame" data-motion="image">
          <MediaPlaceholder src="/assets/atmosphere/overview.png" alt="Palmé café terrace overlooking the beach" label="Wide beach café atmosphere photograph" />
          <div className="atmosphere__note">More<br />Than<br />Ice Cream</div>
          <button className="button atmosphere__cta" type="button" onClick={() => setActiveScene("beach")}>Explore The Beach <Arrow /></button>
        </div>
      </section>

      <section className="section moments" id="moments">
        <div className="moments__header" data-motion="copy">
          <div className="section-heading"><h2>#PalméMoments</h2><p>ช่วงเวลาแห่งความสุขที่คุณชอบ</p></div>
          <button className="button button--outline button--compact" type="button" onClick={() => setActiveScene("gallery")}>View More <Arrow /></button>
        </div>
        <div className="moments-carousel">
          <button className="carousel-control carousel-control--previous" type="button" onClick={() => scrollMoments(-1)} aria-label="Previous moment">←</button>
        <div className="moments__strip" ref={momentsStripRef} data-motion="stagger">
          {moments.map((moment) => (
            <MediaPlaceholder key={moment.asset} src={moment.asset} alt={moment.alt} label={`Gallery image ${moment.asset.slice(-7, -5)}`} sizes="(max-width: 700px) 60vw, 16vw" />
          ))}
        </div>
          <button className="carousel-control carousel-control--next" type="button" onClick={() => scrollMoments(1)} aria-label="Next moment">→</button>
        </div>
      </section>

      <footer className="footer" id="visit" data-motion="copy">
        <div className="footer__brand"><span>Palmé</span><small>Beach Bar</small></div>
        <div className="footer__links">
          <nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#flavors">Menu</a><a href="#story">Our Story</a><a href="#moments">Gallery</a><a href="#visit">Contact</a></nav>
          <p>© 2024 Palmé Beach Bar. All Rights Reserved.</p>
        </div>
        <div className="footer__social" aria-label="Social links">
          <a href="#visit" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg></a>
          <a href="#visit" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" /></svg></a>
          <a href="#visit" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 3v11.2a3.8 3.8 0 1 1-3-3.7" /><path d="M14 3c1 2.5 2.7 4 5 4.3" /></svg></a>
          <a href="#visit" aria-label="LINE"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 10.5c0-3.6-3.6-6.5-8-6.5s-8 2.9-8 6.5 3.6 6.5 8 6.5c.7 0 1.4-.1 2-.3l3.7 2 .4-3.4c1.2-1.2 1.9-2.9 1.9-4.8Z" /><path d="M8 10h.01m4 0h.01m4 0h.01" /></svg></a>
        </div>
        <p className="footer__signoff">See you<br />at the Beach ♡</p>
      </footer>
    </main>
    {activeScene && (
      <div className={`scene scene--${activeScene}`} role="dialog" aria-modal="true" aria-label={`${activeScene} experience`}>
        {activeScene !== "flavor" && <>
          <button className="scene__back" type="button" onClick={() => setActiveScene(null)}>← Back</button>
          <button ref={closeButtonRef} className="scene__close" type="button" onClick={() => setActiveScene(null)} aria-label="Close scene">×</button>
        </>}

        {activeScene === "flavor" && (
          <div className={`scene__layout flavor-scene flavor-scene--${flavors[selectedFlavor].tone} flavor-scene--direction-${flavorDirection > 0 ? "next" : "previous"}`} onWheel={handleFlavorWheel}>
            {flavors[selectedFlavor].detailBackground && (
              <MediaPlaceholder
                key={flavors[selectedFlavor].detailBackground}
                src={flavors[selectedFlavor].detailBackground}
                alt=""
                label={`${flavors[selectedFlavor].name} background photograph`}
                className="flavor-scene__backdrop"
                priority
              />
            )}
            <button className="scene__back" type="button" onClick={() => setActiveScene(null)}>← Back to Menu</button>
            <button ref={closeButtonRef} className="scene__close" type="button" onClick={() => setActiveScene(null)} aria-label="Close scene">×</button>
            <div key={flavors[selectedFlavor].name} className="scene__copy">
              <p className="script-line script-line--small">{flavors[selectedFlavor].name}</p>
              <h2>{flavors[selectedFlavor].nameTh}</h2>
              <p>{selectedFlavor === 1 ? "ไอศกรีมสตรอว์เบอร์รีโฮมเมด หอมหวาน สดชื่น จากผลไม้แท้ 100%" : "ไอศกรีมโฮมเมดเนื้อเนียน หอมหวานพอดี ผลิตจากวัตถุดิบคุณภาพ"}</p>
              <div className="flavor-profile">
                <span><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 8c-3-3-7-2-9 1-3 4 2 11 9 17 7-6 12-13 9-17-2-3-6-4-9-1Z"/><path d="M10 8c2-3 4-4 6-4s4 1 6 4M16 4v5"/></svg><span>{selectedFlavor === 1 ? "Fresh Strawberry" : "Fresh Ingredients"}</span></span>
                <span><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="11"/><path d="M16 9v9"/><circle cx="16" cy="23" r="1" fill="currentColor" stroke="none"/></svg><span>{selectedFlavor === 1 ? "Sweet & Sour Balance" : "Balanced Flavor"}</span></span>
                <span><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 27 5.5 16.8C-1 10.2 8 3 16 11c8-8 17-1 10.5 5.8L16 27Z"/></svg><span>Favorite</span></span>
              </div>
              <div className="flavor-order"><strong className="scene__price">฿ 120</strong><button className="button" type="button">Order Now <Arrow /></button></div>
            </div>
            <MediaPlaceholder key={flavors[selectedFlavor].asset} src={flavors[selectedFlavor].asset} alt={`${flavors[selectedFlavor].name} detail`} label={`${flavors[selectedFlavor].name} detail photograph`} className="scene__hero-media" sizes="(max-width: 600px) 100vw, (max-width: 860px) 58vw, 50vw" />
            <aside className="flavor-switcher" aria-label="You may also like">
              <p>You may also like <span>Scroll ↑↓ to explore</span></p>
              {flavors.map((flavor, index) => index !== selectedFlavor && (
                <button key={flavor.name} type="button" onClick={() => { setFlavorDirection(index > selectedFlavor ? 1 : -1); setSelectedFlavor(index); }}>
                  <MediaPlaceholder src={flavor.asset} alt="" label={flavor.name} sizes="(max-width: 860px) 3.25rem, 7vw" />
                  <span>{flavor.name}</span>
                </button>
              ))}
            </aside>
          </div>
        )}

        {activeScene === "story" && (
          <div className={`scene__layout story-scene story-scene--chapter-${storyChapter}`}>
            <div className="scene__copy" aria-live="polite">
              <p className="scene__kicker">Our Story</p>
              <h2>{storyChapters[storyChapter].title}</h2>
              <p>{storyChapters[storyChapter].body}</p>
              <ol className="scene-tabs">
                {storyChapters.map((chapter, index) => (
                  <li key={chapter.tab}><button type="button" className={storyChapter === index ? "is-active" : ""} aria-pressed={storyChapter === index} onClick={() => setStoryChapter(index)}><span>0{index + 1}</span>{chapter.tab}</button></li>
                ))}
              </ol>
            </div>
            <div className="scene-collage">
              <MediaPlaceholder key={storyChapters[storyChapter].mainAsset} src={storyChapters[storyChapter].mainAsset} alt={storyChapters[storyChapter].mainAlt} label="Palmé story photograph" className={`scene-collage__main${storyChapter === 1 ? " scene-collage__main--product" : ""}`} sizes="(max-width: 860px) 88vw, 48vw" />
              <MediaPlaceholder key={storyChapters[storyChapter].smallAsset} src={storyChapters[storyChapter].smallAsset} alt={storyChapters[storyChapter].smallAlt} label="Supporting story photograph" className="scene-collage__small" sizes="(max-width: 860px) 38vw, 24vw" />
              <div className="story__note">{storyChapters[storyChapter].note}</div>
            </div>
          </div>
        )}

        {activeScene === "beach" && (
          <div className={`scene__layout beach-scene beach-scene--${locations[beachLocation].name.toLowerCase()}`}>
            <div className="scene__copy scene__copy--overlay" aria-live="polite"><p className="scene__kicker">The Atmosphere · {locations[beachLocation].name}</p><h2>Step Into<br />Our Beach Vibe</h2><p>{locations[beachLocation].intro}</p></div>
            <MediaPlaceholder key={locations[beachLocation].asset} src={locations[beachLocation].asset} alt={`${locations[beachLocation].name} atmosphere`} label={`${locations[beachLocation].name} atmosphere photograph`} className="scene__hero-media" sizes="100vw" />
            <div className="location-tabs">
              {locations.map((location, index) => <button key={location.name} type="button" className={beachLocation === index ? "is-active" : ""} aria-pressed={beachLocation === index} onClick={() => setBeachLocation(index)}>{location.name}<small>{location.detail}</small></button>)}
            </div>
          </div>
        )}

        {activeScene === "event" && (
          <div className={`scene__layout event-scene${eventDetailsOpen ? " event-scene--details-open" : ""}`}>
            <div className="scene__copy">
              <p className="scene__kicker">Special Event</p>
              <p className="script-line script-line--small">White Summer &apos;26</p>
              <p>ฤดูร้อนนี้พบกับเมนูลิมิเต็ดและกิจกรรมริมทะเล</p>
              <strong className="event-date"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></svg>1 Mar – 30 Apr 2026</strong>
              <div className="event-features">
                <span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21c5-4 8-8 8-12a8 8 0 0 0-16 0c0 4 3 8 8 12Z" /><path d="M9 9c1-2 2-3 3-3" /></svg>Limited Flavor</span>
                <span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m5 18 5-4 3 2 3-4 3 3" /></svg>Beach Photo Spot</span>
                <span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20 4.5 12.5C0 8 6 2 12 8c6-6 12 0 7.5 4.5L12 20Z" /></svg>Special Menu</span>
              </div>
              <div className="event-details" aria-hidden={!eventDetailsOpen}>
                <div className="event-details__grid">
                  <div><strong>Sunset Scoops</strong><span>เมนูซอฟต์เสิร์ฟลิมิเต็ดเฉพาะช่วงกิจกรรม</span></div>
                  <div><strong>Beach Photo Spot</strong><span>มุมถ่ายภาพริมทะเลพร้อมพร็อพสีเหลือง–ขาว</span></div>
                  <div><strong>Sweet Hour</strong><span>ทุกวัน 16:00–18:00 น. ตลอดช่วง White Summer</span></div>
                </div>
              </div>
              <button className="button" type="button" aria-expanded={eventDetailsOpen} onClick={() => setEventDetailsOpen((isOpen) => !isOpen)}>{eventDetailsOpen ? "Hide Event Details" : "See Event Details"} <Arrow /></button>
            </div>
            <p className="event-scene__tagline" aria-hidden="true">Summer<br />tastes<br />better<br />together ♡</p>
            <MediaPlaceholder src="/assets/events/white-summer.png" alt="White Summer campaign" label="White Summer campaign photograph" className="scene__hero-media" sizes="100vw" />
          </div>
        )}

        {activeScene === "gallery" && (
          <div className="gallery-scene">
            <div className="gallery-scene__title"><p className="scene__kicker">Good days by the sea</p><h2>#PalméMoments</h2><p>ช่วงเวลาแห่งความสุขของคุณ</p></div>
            <div className="gallery-scene__stage" aria-live="polite">
              <MediaPlaceholder key={moments[galleryMoment].asset} src={moments[galleryMoment].asset} alt={moments[galleryMoment].alt} label={moments[galleryMoment].alt} className="gallery-scene__featured" sizes="(max-width: 600px) 92vw, (max-width: 860px) 78vw, 62vw" />
              <span className="gallery-scene__count">0{galleryMoment + 1} / 0{moments.length}</span>
              <button className="carousel-control carousel-control--previous" type="button" onClick={() => changeGalleryMoment(-1)} aria-label="Previous gallery image">←</button>
              <button className="carousel-control carousel-control--next" type="button" onClick={() => changeGalleryMoment(1)} aria-label="Next gallery image">→</button>
            </div>
            <div className="gallery-scene__track" ref={galleryTrackRef} aria-label="Choose a Palmé moment">
              {moments.map((moment, index) => (
                <button key={moment.asset} type="button" className={galleryMoment === index ? "is-active" : ""} aria-pressed={galleryMoment === index} aria-label={`View ${moment.alt}`} onClick={(event) => { setGalleryMoment(index); event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); }}>
                  <MediaPlaceholder src={moment.asset} alt="" label={moment.alt} sizes="(max-width: 600px) 5rem, 8rem" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )}
    </>
  );
}
