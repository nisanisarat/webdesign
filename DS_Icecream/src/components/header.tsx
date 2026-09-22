"use client";

// USING GLOBAL CSS: [src/app/globals.css]
import { navigation } from "@/data/content";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="brand" href="#home" aria-label="Palmé Beach Bar home">
        <span className="brand__placeholder">Palmé</span>
        <small>Beach Bar</small>
      </a>
      <nav className="site-nav" aria-label="Main menu">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <a className="button button--compact" href="#visit">Order Now <span aria-hidden="true">→</span></a>
      <button className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? "Close menu" : "Open menu"} onClick={() => setIsOpen((value) => !value)}>
        <span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
      </button>
      <div className="mobile-menu" id="mobile-menu" data-open={isOpen || undefined}>
        <nav aria-label="Mobile menu">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>)}
        </nav>
        <a className="button" href="#visit" onClick={() => setIsOpen(false)}>Order Now <span aria-hidden="true">→</span></a>
      </div>
    </header>
  );
}
