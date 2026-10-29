
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Mail,
  MessageCircle,
  Palette,
  Sparkles,
} from "lucide-react";
import CrystalField from "@/components/CrystalField";

gsap.registerPlugin(ScrollTrigger);

function InstagramMark({ size = 17 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInMark({ size = 17 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5v6" />
      <circle cx="7.5" cy="7.5" r="0.75" fill="currentColor" />
      <path d="M11.5 16.5v-6h2.8v1.2c.5-.9 1.2-1.4 2.4-1.4 1.8 0 2.8 1.1 2.8 3.3v2.9" />
    </svg>
  );
}

function GitHubMark({ size = 17 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.09.67-3.74-1.31-3.74-1.31-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.56 1.19 3.18.91.1-.71.38-1.19.69-1.46-2.47-.28-5.07-1.23-5.07-5.48 0-1.21.43-2.2 1.13-2.97-.11-.28-.49-1.4.11-2.93 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.01-1.13 3.01-1.13.6 1.53.23 2.65.12 2.93.7.77 1.12 1.76 1.12 2.97 0 4.26-2.61 5.2-5.1 5.47.4.34.74 1.02.74 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}


const projects = [
  {
    number: "01",
    title: "Car Rental",
    theme: "cyan",
    category: "Automotive · Web Design",
    year: "2026",
    image: "/projects/car-rental.jpg",
    description: "A modern car rental booking experience.",
  },
  {
    number: "02",
    title: "SEVAARO",
    theme: "violet",
    category: "Business · Web Platform",
    year: "2026",
    image: "/projects/sevaaro.jpg",
    description: "A digital experience for the SEVAARO project.",
  },
  {
    number: "03",
    title: "Fashion Store",
    theme: "orange",
    category: "Fashion · E-commerce",
    year: "2026",
    image: "/projects/clothing.jpg",
    description: "A clean shopping experience for a fashion brand.",
  },
];


const skills = [
  {
    number: "01",
    title: "Development",
    detail: "React · Next.js · JavaScript · CSS",
    icon: Code2,
  },
  {
    number: "02",
    title: "UI / UX Design",
    detail: "Figma · Wireframes · Design Systems",
    icon: Palette,
  },
  {
    number: "03",
    title: "Motion & Interaction",
    detail: "GSAP · ScrollTrigger · Lenis",
    icon: Sparkles,
  },
];

export default function PortfolioContent() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const canUseLenis = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
    const lenis = canUseLenis
      ? new Lenis({
          duration: 1.05,
          smoothWheel: true,
          wheelMultiplier: 0.9,
        })
      : null;

    const onLenisScroll = () => ScrollTrigger.update();
    const onTick = (time) => lenis?.raf(time * 1000);

    if (lenis) {
      lenis.on("scroll", onLenisScroll);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 899px)").matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-eyebrow", {
            y: isMobile ? 12 : 20,
            opacity: 0,
            duration: isMobile ? 0.5 : 0.7,
          })
          .from(
            ".hero-title-line",
            {
              yPercent: 110,
              opacity: 0,
              duration: isMobile ? 0.7 : 1,
              stagger: isMobile ? 0.09 : 0.15,
            },
            "-=0.25"
          )
          .from(
            ".hero-description, .hero-bottom-link",
            {
              y: isMobile ? 14 : 25,
              opacity: 0,
              duration: isMobile ? 0.55 : 0.8,
              stagger: isMobile ? 0.1 : 0.15,
            },
            "-=0.3"
          );

        gsap.utils.toArray(".reveal").forEach((element) => {
          gsap.from(element, {
            y: isMobile ? 18 : 35,
            opacity: 0,
            duration: isMobile ? 0.6 : 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: isMobile ? "top 91%" : "top 86%",
              once: true,
            },
          });
        });
      }

      const media = gsap.matchMedia();

      const createProjectScroll = (isMobile) => {
        const section = root.querySelector("#projects");
        const track = root.querySelector(".projects-track");
        const cards = gsap.utils.toArray(".project-card", track);

        if (!section || !track || cards.length === 0) return;

        const getCenterX = (card) => {
          const trackRect = track.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();

          return (
            window.innerWidth / 2 -
            (cardRect.left - trackRect.left + cardRect.width / 2)
          );
        };

        const getFirstX = () => getCenterX(cards[0]);
        const getLastX = () => getCenterX(cards[cards.length - 1]);
        const horizontalDistance = () =>
          Math.abs(getLastX() - getFirstX());

        gsap.fromTo(
          track,
          { x: () => getFirstX() },
          {
            x: () => getLastX(),
            ease: "none",
            scrollTrigger: {
              trigger: isMobile ? section : track,
              start: isMobile ? "top top" : "center center",
              end: () => "+=" + Math.max(horizontalDistance(), 1),
              pin: section,
              scrub: isMobile ? 0.7 : 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        return () => {
          gsap.set(track, { clearProps: "transform" });
        };
      };

      media.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => createProjectScroll(false)
      );

      media.add(
        "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        () => createProjectScroll(true)
      );

      return () => media.revert();
    }, root);

    const refreshId = window.setTimeout(
      () => ScrollTrigger.refresh(),
      300
    );

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(onTick);
        lenis.off("scroll", onLenisScroll);
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="portfolio-shell">
      <CrystalField />

      <main>
        {/* HERO */}
        <section id="home" className="hero section-wrap">
          <div className="hero-glow" />

          <p className="hero-eyebrow eyebrow">
            <span className="live-dot" />
            Independent Developer & Designer
          </p>

          <h1 className="hero-title">
            <span className="hero-title-mask">
              <span className="hero-title-line">Mirza Ubaid</span>
            </span>
            <span className="hero-title-mask">
              <span className="hero-title-line title-muted">Beg</span>
            </span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              I build distinctive digital experiences through thoughtful
              design, creative code, and meaningful motion.
            </p>

            <a href="#projects" className="pill-link hero-bottom-link">
              Explore selected work <ArrowUpRight size={17} />
            </a>
          </div>

          <a href="#about" className="hero-scroll">
            <span>Scroll to discover</span>
            <ArrowDown size={15} />
          </a>

          <span className="hero-index">PORTFOLIO / 2026</span>
        </section>

        {/* ABOUT */}
        <section id="about" className="about section-wrap">
          <p className="eyebrow reveal"> — A little about me</p>

          <h2 className="about-heading reveal">
            I turn ambitious ideas into
            <span> thoughtful digital experiences.</span>
          </h2>

          <div className="about-bottom reveal">
            <p>
              I combine design sensibility with frontend development to
              create interfaces that feel clear, immersive, and alive.
              From the smallest detail to the overall experience, every
              choice has a purpose.
            </p>

            <div className="about-tags">
              <span>Design</span>
              <span>Development</span>
              <span>Interaction</span>
              <span>Experimentation</span>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="projects-section">
          <div className="projects-intro section-wrap">
            <p className="eyebrow"> — Selected work</p>
            <h2 className="section-title">
              Made with <span>intention.</span>
            </h2>
            <p className="projects-caption">
              A collection of concepts and digital experiences.
            </p>
          </div>

          <div className="projects-track">
            {projects.map((project) => (
              <article
                className={`project-card project-${project.theme}`}
                key={project.number}
              >
                
<div className="project-art">
  <Image
    className="project-image"
    src={project.image}
    alt={`${project.title} website project`}
    fill
    sizes="(max-width: 899px) 100vw, 50vw"
  />
  <div className="project-image-overlay" />
  <span className="art-number">{project.number}</span>
  <span className="art-label">{project.category}</span>
</div>


                <div className="project-meta">
                  <div>
                    <p className="project-category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <span className="project-year">{project.year}</span>
                </div>
              </article>
            ))}
          </div>

          <p className="horizontal-hint">
            Scroll to move through projects <span>→</span>
          </p>
        </section>

        {/* SKILLS */}
        <section id="skills" className="skills section-wrap">
          <p className="eyebrow reveal"> — What I do</p>
          <h2 className="section-title reveal">
            Design meets <span>technology.</span>
          </h2>

          <div className="skills-grid">
            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                <article className="skill-card reveal" key={skill.number}>
                  <div className="skill-card-top">
                    <span>{skill.number}</span>
                    <Icon size={23} strokeWidth={1.5} />
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.detail}</p>
                  <span className="skill-line" />
                </article>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact section-wrap">
          <p className="eyebrow reveal">— Have something in mind?</p>

          <h2 className="contact-title reveal">
            Let&apos;s make
            <br />
            <span>something meaningful.</span>
          </h2>

          <p className="contact-description reveal">
            Have a project, an idea, or just want to connect? My inbox is
            open.
          </p>

          <a
            href="mailto:begmirzaubaid1@gmail.com"
            className="pill-link contact-button reveal"
          >
            Get in Touch<ArrowUpRight size={18} />
          </a>
        </section>

        <footer className="footer">
          <div className="footer-brand">
            <a href="#home" className="footer-logo" aria-label="Back to top" title="Back to top">
              <Image
                src="/projects/vectorlogo.png"
                alt=""
                width={42}
                height={42}
                className="footer-logo-image"
              />
            </a>
            <p>© 2026 Mirza Ubaid Beg</p>
          </div>
          <nav className="footer-socials" aria-label="Social media and contact">
            <a
              href="https://www.instagram.com/mirza_ubaid_beg_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramMark size={17} />
            </a>
            <a
              href="https://wa.me/918948503809"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle size={17} strokeWidth={1.7} />
            </a>
            <a
              href="https://www.linkedin.com/in/mirza-ubaid-beg-a08b6343b/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInMark size={17} />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubMark size={17} />
            </a>
            <a
              href="mailto:begmirzaubaid1@gmail.com"
              aria-label="Email contact"
              title="Email"
            >
              <Mail size={17} strokeWidth={1.7} />
            </a>
          </nav>
        </footer>
      </main>
    </div>
  );
}
