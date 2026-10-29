
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);
    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const marker = window.innerHeight * 0.38;
      let currentSection = sections[0]?.id ?? "home";

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) {
          currentSection = section.id;
        }
      });

      setActiveSection((current) =>
        current === currentSection ? current : currentSection
      );
    };

    const requestActiveSectionUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    requestActiveSectionUpdate();
    window.addEventListener("scroll", requestActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestActiveSectionUpdate);

    return () => {
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("resize", requestActiveSectionUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <span className="logo-mark">
            <Image
              src="/projects/vectorlogo.png"
              alt=""
              width={36}
              height={36}
              className="nav-logo-image"
            />
          </span>
          <span>Mirza Ubaid Beg</span>
        </a>

        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {links.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                {link.label}
              </a>
            );
          })}

          <a
            className="nav-cta"
            href="mailto:begmirzaubaid1@gmail.com"
            onClick={closeMenu}
          >
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
        </div>

        <button
          type="button"
          className="nav-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
    </header>
  );
}
