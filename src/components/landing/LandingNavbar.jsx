import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { RetroSpark } from './Doodles';

export default function LandingNavbar({ onStartPhotobox }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    setMobileOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="v2-navbar">
      <div className="v2-nav-container">
        {/* Brand */}
        <div
          className="v2-brand"
          onClick={() => scrollTo('home')}
          role="button"
          tabIndex={0}
        >
          <RetroSpark size={22} color="#E8431F" />
          <span className="v2-brand-text">PHOTOBOX STUDIO</span>
        </div>

        {/* Desktop Links */}
        <ul className="v2-nav-links">
          <li>
            <a
              href="#home"
              className={`v2-nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className={`v2-nav-link ${activeSection === 'features' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#templates"
              className={`v2-nav-link ${activeSection === 'templates' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('templates'); }}
            >
              Templates
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className={`v2-nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#couple-room"
              className={`v2-nav-link ${activeSection === 'couple-room' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('couple-room'); }}
            >
              Couple Room
            </a>
          </li>
        </ul>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="button"
            className="v2-btn-pill-yellow"
            onClick={onStartPhotobox}
          >
            <span>Start Photobox</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="v2-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`v2-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li>
            <a
              href="#home"
              className="v2-nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="v2-nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#templates"
              className="v2-nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo('templates'); }}
            >
              Templates
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="v2-nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#couple-room"
              className="v2-nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo('couple-room'); }}
            >
              Couple Room
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="v2-btn-pill-yellow"
          style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          onClick={() => { setMobileOpen(false); onStartPhotobox(); }}
        >
          <span>Start Photobox</span>
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}
