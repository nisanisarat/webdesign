"use client";

// USING GLOBAL CSS: [src/app/globals.css]
import { flavors, locations, moments } from "@/data/content";
import { useEffect, useRef, useState } from "react";
import { Header } from "./header";
import { MediaPlaceholder } from "./media-placeholder";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export function Homepage() {
  const [activeScene, setActiveScene] = useState<"flavor" | "story" | "beach" | "event" | "gallery" | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState(1);
  const [storyChapter, setStoryChapter] = useState(0);
  const [beachLocation, setBeachLocation] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const flavorShelfRef = useRef<HTMLDivElement>(null);
  const momentsStripRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

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

  const openFlavor = (index: number) => {
    setSelectedFlavor(index);
    setActiveScene("flavor");
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

  const scrollGallery = (direction: -1 | 1) => {
    const track = galleryTrackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * track.clientWidth * 0.7, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
    <main>
      <section className="hero" id="home">
        <MediaPlaceholder
          src="/assets/hero-beach-cafe.webp"
          alt="Palmé Beach Bar beside the sea"
          label="Hero beach café photograph"
          className="hero__media"
          priority
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
        <div className="section-heading section-heading--center">
          <h2>Our Flavors</h2>
          <p>ไอศกรีมโฮมเมด รสชาติที่มาจากความสุข</p>
        </div>
        <div className="flavor-carousel">
          <button className="carousel-control carousel-control--previous" type="button" onClick={() => scrollFlavors(-1)} aria-label="Previous flavor">←</button>
        <div className="flavor-shelf" ref={flavorShelfRef}>
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
        </div>
        <div className="section-action"><button className="button button--outline" type="button" onClick={() => openFlavor(0)}>View All Flavors <Arrow /></button></div>
      </section>

      <section className="section section--tight campaign" id="events">
        <div className="section-heading"><h2>What&apos;s On</h2><p>กิจกรรมและเมนูพิเศษประจำฤดูกาล</p></div>
        <div className="campaign__panel">
          <MediaPlaceholder src="/assets/campaign-white-summer.webp" alt="White Summer ice cream by the sea" label="White Summer campaign photograph" />
          <div className="campaign__copy">
            <p className="script-line script-line--small">White Summer &apos;26</p>
            <p className="campaign__list">Special menu<br />Beach vibes<br />Sweet moments</p>
            <button className="button" type="button" onClick={() => setActiveScene("event")}>Explore Event <Arrow /></button>
          </div>
        </div>
      </section>

      <section className="section story" id="story">
        <div className="story__copy">
          <div className="section-heading"><h2>Our Story</h2><p>เรื่องราวของ Palmé</p></div>
          <h3>Small Shop<br />Big Happiness</h3>
          <p>จากไอศกรีมเล็ก ๆ ริมทะเล สู่พื้นที่แห่งความสุขของทุกคน</p>
          <button className="button button--outline" type="button" onClick={() => setActiveScene("story")}>Explore Our Story <Arrow /></button>
        </div>
        <div className="story__collage">
          <MediaPlaceholder src="/assets/story-shop.webp" alt="Palmé beach shop exterior" label="Palmé storefront photograph" className="story__photo story__photo--main" sizes="45vw" />
          <MediaPlaceholder src="/assets/story-beach.webp" alt="Beach near Palmé" label="Supporting beach photograph" className="story__photo story__photo--small" sizes="24vw" />
          <div className="story__note">Good people<br />Good ice cream<br />Good days ♡</div>
        </div>
      </section>

      <section className="section atmosphere">
        <div className="section-heading"><h2>The Atmosphere</h2><p>บรรยากาศที่มากกว่าแค่ร้านไอศกรีม</p></div>
        <div className="atmosphere__frame">
          <MediaPlaceholder src="/assets/atmosphere-beach-cafe.webp" alt="Palmé café terrace overlooking the beach" label="Wide beach café atmosphere photograph" />
          <div className="atmosphere__note">More<br />Than<br />Ice Cream</div>
          <button className="button atmosphere__cta" type="button" onClick={() => setActiveScene("beach")}>Explore The Beach <Arrow /></button>
        </div>
      </section>

      <section className="section moments" id="moments">
        <div className="moments__header">
          <div className="section-heading"><h2>#PalméMoments</h2><p>ช่วงเวลาแห่งความสุขที่คุณชอบ</p></div>
          <button className="button button--outline button--compact" type="button" onClick={() => setActiveScene("gallery")}>View More <Arrow /></button>
        </div>
        <div className="moments-carousel">
          <button className="carousel-control carousel-control--previous" type="button" onClick={() => scrollMoments(-1)} aria-label="Previous moment">←</button>
        <div className="moments__strip" ref={momentsStripRef}>
          {moments.map((moment) => (
            <MediaPlaceholder key={moment.asset} src={moment.asset} alt={moment.alt} label={`Gallery image ${moment.asset.slice(-7, -5)}`} sizes="(max-width: 700px) 60vw, 16vw" />
          ))}
        </div>
          <button className="carousel-control carousel-control--next" type="button" onClick={() => scrollMoments(1)} aria-label="Next moment">→</button>
        </div>
      </section>

      <footer className="footer" id="visit">
        <div className="footer__brand"><span>Palmé</span><small>Beach Bar</small></div>
        <nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#flavors">Menu</a><a href="#story">Our Story</a><a href="#moments">Gallery</a></nav>
        <div className="footer__social" aria-label="Social links"><a href="#visit">Instagram</a><a href="#visit">Facebook</a><a href="#visit">TikTok</a><a href="#visit">LINE</a></div>
        <p>Open daily · 10:00–20:00<br /><a href="#visit">Get Direction →</a></p>
      </footer>
    </main>
    {activeScene && (
      <div className={`scene scene--${activeScene}`} role="dialog" aria-modal="true" aria-label={`${activeScene} experience`}>
        {activeScene !== "flavor" && <>
          <button className="scene__back" type="button" onClick={() => setActiveScene(null)}>← Back</button>
          <button ref={closeButtonRef} className="scene__close" type="button" onClick={() => setActiveScene(null)} aria-label="Close scene">×</button>
        </>}

        {activeScene === "flavor" && (
          <div className="scene__layout flavor-scene">
            <button className="scene__back" type="button" onClick={() => setActiveScene(null)}>← Back to Menu</button>
            <button ref={closeButtonRef} className="scene__close" type="button" onClick={() => setActiveScene(null)} aria-label="Close scene">×</button>
            <div className="scene__copy">
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
            <MediaPlaceholder src={flavors[selectedFlavor].asset} alt={`${flavors[selectedFlavor].name} detail`} label={`${flavors[selectedFlavor].name} detail photograph`} className="scene__hero-media" sizes="(max-width: 720px) 100vw, 50vw" />
            <aside className="flavor-switcher" aria-label="You may also like">
              <p>You may also like</p>
              {flavors.map((flavor, index) => index !== selectedFlavor && (
                <button key={flavor.name} type="button" onClick={() => setSelectedFlavor(index)}>
                  <MediaPlaceholder src={flavor.asset} alt="" label={flavor.name} />
                  <span>{flavor.name}</span>
                </button>
              ))}
            </aside>
          </div>
        )}

        {activeScene === "story" && (
          <div className="scene__layout story-scene">
            <div className="scene__copy">
              <p className="scene__kicker">Our Story</p>
              <h2>Small Shop<br />Big Happiness</h2>
              <p>จากความรักในไอศกรีมและบรรยากาศริมทะเล เราอยากให้ทุกคนได้พักและมีความสุขเล็ก ๆ ในทุกวัน</p>
              <ol className="scene-tabs">
                {["The Beginning", "Our Ice Cream", "Beach Life", "Palmé Today"].map((chapter, index) => (
                  <li key={chapter}><button type="button" className={storyChapter === index ? "is-active" : ""} onClick={() => setStoryChapter(index)}><span>0{index + 1}</span>{chapter}</button></li>
                ))}
              </ol>
            </div>
            <div className="scene-collage">
              <MediaPlaceholder src="/assets/story-shop.webp" alt="Palmé shop" label="Palmé storefront photograph" className="scene-collage__main" />
              <MediaPlaceholder src="/assets/story-beach.webp" alt="Palmé beach" label="Supporting beach photograph" className="scene-collage__small" />
              <div className="story__note">A sweet story<br />since 2020</div>
            </div>
          </div>
        )}

        {activeScene === "beach" && (
          <div className="scene__layout beach-scene">
            <div className="scene__copy scene__copy--overlay"><p className="scene__kicker">The Atmosphere</p><h2>Step Into<br />Our Beach Vibe</h2><p>มากกว่าไอศกรีม คือช่วงเวลาดี ๆ ที่รอคุณอยู่</p></div>
            <MediaPlaceholder src={locations[beachLocation].asset} alt={`${locations[beachLocation].name} atmosphere`} label={`${locations[beachLocation].name} atmosphere photograph`} className="scene__hero-media" />
            <div className="location-tabs">
              {locations.map((location, index) => <button key={location.name} type="button" className={beachLocation === index ? "is-active" : ""} onClick={() => setBeachLocation(index)}>{location.name}<small>{location.detail}</small></button>)}
            </div>
          </div>
        )}

        {activeScene === "event" && (
          <div className="scene__layout event-scene">
            <div className="scene__copy"><p className="scene__kicker">Special Event</p><p className="script-line script-line--small">White Summer &apos;26</p><p>ฤดูร้อนนี้พบกับเมนูลิมิเต็ดและกิจกรรมริมทะเล</p><strong>1 Mar – 30 Apr 2026</strong><div className="event-features"><span>Limited Flavor</span><span>Beach Photo Spot</span><span>Special Menu</span></div><button className="button" type="button">See Event Details <Arrow /></button></div>
            <MediaPlaceholder src="/assets/campaign-white-summer.webp" alt="White Summer campaign" label="White Summer campaign photograph" className="scene__hero-media" />
          </div>
        )}

        {activeScene === "gallery" && (
          <div className="gallery-scene">
            <div className="gallery-scene__title"><h2>#PalméMoments</h2><p>ช่วงเวลาแห่งความสุขของคุณ</p></div>
            <div className="gallery-scene__rail">
              <button className="carousel-control carousel-control--previous" type="button" onClick={() => scrollGallery(-1)} aria-label="Previous gallery image">←</button>
              <div className="gallery-scene__track" ref={galleryTrackRef}>{moments.map((moment) => <MediaPlaceholder key={moment.asset} src={moment.asset} alt={moment.alt} label={moment.alt} />)}</div>
              <button className="carousel-control carousel-control--next" type="button" onClick={() => scrollGallery(1)} aria-label="Next gallery image">→</button>
            </div>
          </div>
        )}
      </div>
    )}
    </>
  );
}
