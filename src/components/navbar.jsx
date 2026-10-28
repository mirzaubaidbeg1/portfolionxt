
"use client";

import { useState } from "react";
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

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <span className="logo-mark">M.</span>
          <span>Mirza Ubaid Beg</span>
        </a>

        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}

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
