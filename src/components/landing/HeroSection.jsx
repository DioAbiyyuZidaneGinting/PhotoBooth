import React from 'react';
import { ArrowRight } from 'lucide-react';
import { 
  RetroSpark, BrushUnderline, PaintSplotch, 
  CameraDoodle, DotGrid, RotatingStamp 
} from './Doodles';

export default function HeroSection({ onStartPhotobox, onExploreTemplates }) {
  return (
    <section id="home" className="v2-hero-section">
      <div className="v2-hero-container">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="v2-hero-left">
          {/* Small Red-Orange Label */}
          <div className="v2-badge-red">
            <RetroSpark size={18} color="#E8431F" />
            <span>DIGITAL PHOTOBOOTH EXPERIENCE</span>
          </div>

          {/* Giant Editorial Headline */}
          <h1 className="v2-hero-headline">
            Make Every <br />
            Moment a <br />
            <span className="relative-wrap">
              Memory.
              <span className="brush-under">
                <BrushUnderline color="#E8431F" width={260} height={16} />
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <p className="v2-hero-tagline">
            Your Moments. Your Frame. Your Story.
          </p>

          {/* Description */}
          <p className="v2-hero-description">
            Create beautiful photo memories with unique frames, creative layouts, 
            and a photobooth experience you can share with anyone, anywhere.
          </p>

          {/* CTAs & Rotating Stamp */}
          <div className="v2-hero-cta-row">
            <button
              type="button"
              className="v2-btn-pill-yellow"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
              onClick={onStartPhotobox}
            >
              <span>Start Photobox</span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              className="v2-text-link"
              style={{ background: 'none', border: 'none', padding: 0 }}
              onClick={onExploreTemplates}
            >
              Explore Templates →
            </button>

            {/* Rotating Round Stamp */}
            <div style={{ marginLeft: 'auto' }}>
              <RotatingStamp
                text="MOMENTS • FRAMES • MEMORIES •"
                size={95}
                bg="#F2B71F"
                textColor="#111111"
                centerIcon="✦"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Handcrafted Photostrip Mockup Composition */}
        <div className="v2-hero-right">
          <div className="v2-hero-visual-stage">
            {/* 1. Irregular Painted Yellow Splotch Background */}
            <div className="v2-paint-splotch">
              <PaintSplotch color="#F2B71F" width={420} height={380} />
            </div>

            {/* 2. Camera Doodle & Flash Rays */}
            <div style={{ position: 'absolute', top: -10, left: 20, zIndex: 12 }}>
              <CameraDoodle size={58} color="#E8431F" />
            </div>

            {/* 3. Dot Grid Graphic Accent */}
            <div style={{ position: 'absolute', bottom: 10, left: -10, zIndex: 2 }}>
              <DotGrid rows={4} cols={6} color="#111111" gap={16} size={3.5} />
            </div>

            {/* 4. Small Polaroid Card (Tilted Behind) */}
            <div className="v2-hero-polaroid">
              <img
                src="/hero/polaroid-couple.jpg"
                alt="Couple memories instant photo"
                className="v2-polaroid-img"
                loading="eager"
              />
              <div className="v2-polaroid-note">
                OCT &apos;96 • NYC
              </div>
            </div>

            {/* 5. Primary Vertical Photostrip (Front Center, -4 deg) */}
            <div className="v2-hero-photostrip">
              <img
                src="/hero/photostrip-friends.jpg"
                alt="Photobox studio authentic photostrip"
                className="v2-photostrip-img"
                loading="eager"
              />
              <div className="v2-photostrip-stamp-row">
                <span>PHOTOBOX</span>
                <span>STUDIO • 95</span>
              </div>
            </div>

            {/* 6. Sparkle Accent */}
            <div style={{ position: 'absolute', bottom: 40, right: -15, zIndex: 15 }}>
              <RetroSpark size={36} color="#E8431F" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
