import { useState, useEffect } from "react";
import "./Navbar.css";
import { useSmoothScroll } from "../smoothScroll";

const NAV_LINKS = [
  { id: "education", label: "Education" },
  { id: "tech", label: "Tech" },
  { id: "music", label: "Music" },
  { id: "ventures", label: "Ventures" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = useSmoothScroll({ defaultDuration: 900, defaultOffset: 72 });

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to highlight currently active section
  useEffect(() => {
    const sectionIds = ["education", "tech", "music", "ventures"];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px", // Trigger when section is in top-middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    scrollTo(id);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? "navbar-header--scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand / Logo */}
        <button
          className="navbar-brand cinzel-decorative-black"
          onClick={handleLogoClick}
          aria-label="Scroll to top"
        >
          CYC
        </button>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav--desktop" aria-label="Main Navigation">
          <ul className="navbar-links">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="navbar-item">
                  <button
                    className={`navbar-link ${isActive ? "navbar-link--active" : ""}`}
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.label}
                    {isActive && <span className="navbar-link-indicator" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`navbar-hamburger ${mobileMenuOpen ? "navbar-hamburger--open" : ""}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`navbar-mobile-drawer ${mobileMenuOpen ? "navbar-mobile-drawer--open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="navbar-mobile-links">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <button
                  className={`navbar-mobile-link ${isActive ? "navbar-mobile-link--active" : ""}`}
                  onClick={() => handleNavClick(link.id)}
                >
                  <span className="navbar-mobile-num">0{NAV_LINKS.indexOf(link) + 1}</span>
                  <span className="navbar-mobile-text">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}

