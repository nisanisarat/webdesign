// USING GLOBAL CSS: [src/styles/home.css]
import Link from "next/link";
import { getHomeContent } from "@/content/home";
import { localePath, type Locale } from "@/lib/site-navigation";
import "@/styles/home.css";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const language: Locale = locale === "en" ? "en" : "th";
  const copy = getHomeContent(language);

  return (
    <main id="main-content" className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__content home-container">
          <h1 id="home-title" className="home-hero__title">LOTUS<br />PAVILION</h1>
          <p className="home-hero__subtitle">{copy.hero.subtitle}</p>
          <p className="home-hero__eyebrow">{copy.hero.eyebrow}</p>
          <Link className="home-action home-action--ink" href={localePath(language, "garden")}>{copy.hero.action}<span aria-hidden="true">↗</span></Link>
        </div>
        <span className="home-hero__side-note" aria-hidden="true">A MORE<br />TRANQUIL<br />WORLD</span>
      </section>

      <section className="home-story" aria-labelledby="garden-title">
        <div className="home-story__content home-container">
          <p className="home-kicker">{copy.garden.eyebrow}</p>
          <h2 id="garden-title">{copy.garden.title}</h2>
          <p className="home-story__description">{copy.garden.description}</p>
          <Link className="home-action home-action--light" href={`${localePath(language, "garden")}?view=story`}>{copy.garden.action}<span aria-hidden="true">↗</span></Link>
        </div>
        <span className="home-story__ornament" aria-hidden="true">蓮<br />·<br />人<br />·<br />境</span>
      </section>

      <section className="home-pavilion" aria-labelledby="pavilion-title">
        <div className="home-pavilion__content home-container">
          <p className="home-kicker">{copy.pavilion.eyebrow}</p>
          <h2 id="pavilion-title">{copy.pavilion.title}</h2>
          <p className="home-pavilion__description">{copy.pavilion.description}</p>
          <Link className="home-action home-action--light" href={localePath(language, "pavilion")}>{copy.pavilion.action}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="home-seasons" aria-labelledby="seasons-title">
        <div className="home-seasons__top home-container">
          <div><p className="home-kicker">{copy.seasons.eyebrow}</p><h2 id="seasons-title">{copy.seasons.title}</h2></div>
          <p>{copy.seasons.note}</p>
        </div>
        <nav className="home-seasons__links home-container" aria-label={language === "th" ? "เลือกฤดูกาล" : "Explore a season"}>
          {copy.seasons.items.map((season) => (
            <Link key={season.id} href={`${localePath(language, "seasons")}?season=${season.id}`}>
              <span>{season.title}</span><small>{season.detail}</small>
            </Link>
          ))}
        </nav>
      </section>

      <section className="home-gallery" aria-labelledby="gallery-title">
        <div className="home-container home-gallery__grid">
          <div className="home-gallery__copy">
            <h2 id="gallery-title">{copy.gallery.title}</h2>
            <p>{copy.gallery.description}</p>
            <Link className="home-action home-action--light" href={localePath(language, "gallery")}>{copy.gallery.action}<span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="home-reflection" aria-labelledby="reflection-title">
        <div className="home-container home-reflection__content"><h2 id="reflection-title">{copy.reflection.title}</h2><p>{copy.reflection.note}</p></div>
      </section>

      <section className="home-visit" aria-labelledby="visit-title">
        <div className="home-container home-visit__content">
          <p className="home-kicker">{copy.visit.eyebrow}</p><h2 id="visit-title">{copy.visit.title}</h2>
          <Link className="home-action home-action--light" href={localePath(language, "visit")}>{copy.visit.action}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
