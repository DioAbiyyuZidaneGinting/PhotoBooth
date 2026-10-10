import React from 'react';
import { RetroSpark, RotatingStamp } from './Doodles';

export default function Footer({ onStartPhotobox }) {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
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
    <footer className="v2-footer">
      <div className="v2-footer-container">
        <div className="v2-footer-top">
          {/* Brand Info */}
          <div className="v2-footer-brand-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <RetroSpark size={24} color="#E8431F" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                PHOTOBOX STUDIO
              </span>
            </div>
            <p style={{ color: 'var(--c-muted-ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Your Moments. Your Frame. Your Story. An authentic digital photobooth with handcrafted layouts and real-time couple rooms.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="v2-footer-links-group">
            <div className="v2-footer-col">
              <span className="v2-footer-col-title">Navigation</span>
              <a href="#home" className="v2-footer-link" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
                Home
              </a>
              <a href="#features" className="v2-footer-link" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>
                Features
              </a>
              <a href="#templates" className="v2-footer-link" onClick={(e) => { e.preventDefault(); scrollTo('templates'); }}>
                Templates
              </a>
              <a href="#how-it-works" className="v2-footer-link" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>
                How It Works
              </a>
            </div>

            <div className="v2-footer-col">
              <span className="v2-footer-col-title">Experience</span>
              <button
                type="button"
                className="v2-footer-link"
                style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
                onClick={onStartPhotobox}
              >
                Start Photobox
              </button>
              <a href="#couple-room" className="v2-footer-link" onClick={(e) => { e.preventDefault(); scrollTo('couple-room'); }}>
                Online Couple Room
              </a>
              <a href="#templates" className="v2-footer-link" onClick={(e) => { e.preventDefault(); scrollTo('templates'); }}>
                Frame Catalog
              </a>
            </div>

            {/* Rotating Stamp */}
            <div style={{ alignSelf: 'center' }}>
              <RotatingStamp
                text="PHOTOBOX STUDIO • 2026 •"
                size={95}
                bg="#111111"
                textColor="#F2B71F"
                centerIcon="✦"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="v2-footer-bottom">
          <div>
            &copy; {currentYear} PHOTOBOX STUDIO. All rights reserved.
          </div>
          <div>
            Crafted for timeless memories.
          </div>
        </div>
      </div>
    </footer>
  );
}
