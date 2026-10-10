import React from 'react';
import { RetroSpark, CrownDoodle, BrushUnderline, RotatingStamp } from './Doodles';

export default function AboutBand() {
  return (
    <section className="v2-band-about">
      {/* Left Column: Signal Red-Orange Panel with Mockup & Crown Doodle */}
      <div className="v2-about-left-red">
        {/* Crown doodle hovering over card */}
        <div style={{ marginBottom: '-12px', zIndex: 10 }}>
          <CrownDoodle size={42} color="#F2B71F" />
        </div>

        {/* Mini Photostrip Mockup Card */}
        <div className="v2-about-illustration-card">
          <img
            src="/hero/photostrip-friends.jpg"
            alt="Handcrafted memories"
            style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px', border: '1.5px solid #111111' }}
            loading="lazy"
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 900, color: '#111111', textTransform: 'uppercase' }}>
            <span>AUTHENTIC FILM</span>
            <RetroSpark size={16} color="#E8431F" />
          </div>
        </div>

        {/* Background Spark Accent */}
        <div style={{ position: 'absolute', top: 25, right: 35, opacity: 0.8 }}>
          <RetroSpark size={30} color="#F8F1E3" />
        </div>
      </div>

      {/* Right Column: Warm Cream Panel with Editorial Serif Heading */}
      <div className="v2-about-right-cream">
        <span className="v2-section-label-red">ABOUT PHOTOBOX</span>

        <h2 className="v2-heading-serif">
          Frames with personality. <br />
          Memories with{' '}
          <span className="accent-italic">
            soul.
            <span style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }}>
              <BrushUnderline color="#E8431F" width={110} height={12} />
            </span>
          </span>
        </h2>

        <p className="v2-about-paragraph">
          We built Photobox Studio for people who believe candid moments deserve more than just 
          another forgotten snapshot in their camera roll. Pick an artistic frame, pose with your 
          friends, and walk away with a beautifully rendered photostrip made for printing and sharing.
        </p>

        {/* Small Yellow Round Stamp */}
        <div style={{ marginTop: '0.75rem' }}>
          <RotatingStamp
            text="MADE FOR EVERY OCCASION •"
            size={90}
            bg="#F2B71F"
            textColor="#111111"
            centerIcon="♥"
          />
        </div>
      </div>
    </section>
  );
}
