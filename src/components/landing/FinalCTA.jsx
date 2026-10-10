import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { RetroSpark, BrushUnderline, HandOkDoodle } from './Doodles';

export default function FinalCTA({ onStartPhotobox }) {
  return (
    <section className="v2-band-final-cta">
      <div className="v2-final-cta-container">
        {/* Left Column: Heading, description, and black pill CTA */}
        <div className="v2-final-cta-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RetroSpark size={18} color="#111111" />
            <span style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.12em', color: '#111111', textTransform: 'uppercase' }}>
              READY?
            </span>
          </div>

          <h2 className="v2-final-cta-headline">
            Your next favorite photo <br />
            starts here.
          </h2>

          <div style={{ marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
            <BrushUnderline color="#111111" width={280} height={16} />
          </div>

          <p style={{ fontSize: '1.2rem', color: '#333333', lineHeight: 1.6, maxWidth: '520px' }}>
            Pick a frame, capture the moment, and keep it forever. No downloads or installations required.
          </p>

          <div>
            <button
              type="button"
              className="v2-btn-pill-black"
              onClick={onStartPhotobox}
              id="cta-bottom-start"
            >
              <Camera size={20} />
              <span>Start Your Photobox</span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Right Column: Tilted Photostrip + Starburst + Hand Doodle */}
        <div className="v2-final-cta-right">
          <div style={{ position: 'relative' }}>
            {/* Hand OK doodle */}
            <div style={{ position: 'absolute', top: -35, left: -40, zIndex: 12 }}>
              <HandOkDoodle size={64} color="#111111" />
            </div>

            {/* Red starburst spark */}
            <div style={{ position: 'absolute', bottom: -15, right: -25, zIndex: 12 }}>
              <RetroSpark size={44} color="#E8431F" />
            </div>

            {/* Photostrip Card */}
            <div style={{
              width: '190px',
              background: '#FFFBF2',
              border: '3px solid #111111',
              padding: '10px 10px 22px',
              borderRadius: '6px',
              boxShadow: '8px 8px 0 #111111',
              transform: 'rotate(5deg)',
              position: 'relative',
              zIndex: 5
            }}>
              <img
                src="/hero/photostrip-friends.jpg"
                alt="Photobox memories strip"
                style={{ width: '100%', border: '1.5px solid #111111', borderRadius: 2, display: 'block' }}
                loading="lazy"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '0.65rem', fontWeight: 900, color: '#111111' }}>
                <span>PHOTOBOX</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
