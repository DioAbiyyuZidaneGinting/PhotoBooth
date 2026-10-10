import React from 'react';
import { Layers, Camera, Download, Heart, Sparkles } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Layers size={24} />,
      title: 'Creative Frames',
      desc: 'Choose unique photobooth frames for different moods and occasions, from vintage western strips to dark film aesthetics.'
    },
    {
      icon: <Camera size={24} />,
      title: 'Multi-Photo Capture',
      desc: 'Create 3-photo, 4-photo, or 6-photo strips with automated countdown timers, shutter sounds, and live slot sequence.'
    },
    {
      icon: <Download size={24} />,
      title: 'Instant Download',
      desc: 'Download your finished photostrip in high-quality PNG or JPG instantly, or print directly with customized margins.'
    },
    {
      icon: <Heart size={24} />,
      title: 'Online Couple Room',
      desc: 'Create a room and share its code with someone far away. Take turns capturing photos in real-time WebRTC sync.'
    }
  ];

  return (
    <section id="features" className="section-features">
      <div className="section-container">
        <div className="section-header-center">
          <span className="section-label">STUDIO CAPABILITIES</span>
          <h2 className="section-title">Everything You Need to Create</h2>
          <p className="section-description">
            Experience the joy of a physical photobooth reimagined for the web, equipped with professional capture logic and instant outputs.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className="feature-card-item">
              <div className="feature-icon-box">
                {feat.icon}
              </div>
              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
