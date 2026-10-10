import React from 'react';
import { Layers, Camera, Download, Heart } from 'lucide-react';
import { ZigzagUnderline, RetroSpark } from './Doodles';

export default function FeaturesBand() {
  const features = [
    {
      icon: <Layers size={22} />,
      title: 'Creative Frames',
      desc: 'Choose unique photobooth frames for different moods and occasions, from vintage western strips to dark film aesthetics.'
    },
    {
      icon: <Camera size={22} />,
      title: 'Multi-Photo Capture',
      desc: 'Create 3-photo, 4-photo, or 6-photo strips with automated countdown shutters and sequential slot indicators.'
    },
    {
      icon: <Download size={22} />,
      title: 'Instant Download',
      desc: 'Download your finished photostrip in high-quality PNG or JPG instantly, or print with authentic borders.'
    },
    {
      icon: <Heart size={22} />,
      title: 'Online Couple Room',
      desc: 'Create a room and share its code with someone far away. Alternate photo slots and capture memories together in real time.',
      badge: 'LIVE P2P'
    }
  ];

  return (
    <section id="features" className="v2-band-features">
      <div className="v2-features-container">
        {/* Header with Zigzag Brush Line */}
        <div className="v2-features-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RetroSpark size={16} color="#F2B71F" />
            <span className="v2-section-label-yellow">STUDIO FEATURES</span>
          </div>

          <h2 className="v2-heading-serif-white">
            Everything you need to create
          </h2>

          <div style={{ marginTop: '0.6rem' }}>
            <ZigzagUnderline color="#F2B71F" width={220} height={18} />
          </div>
        </div>

        {/* 4 Feature Columns Separated by Thin Lines */}
        <div className="v2-features-grid">
          {features.map((item, idx) => (
            <div key={idx} className="v2-feature-col">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="v2-feature-icon-holder">
                  {item.icon}
                </div>
                {item.badge && (
                  <span className="v2-badge-live">{item.badge}</span>
                )}
              </div>

              <h3 className="v2-feature-title">{item.title}</h3>
              <p className="v2-feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
