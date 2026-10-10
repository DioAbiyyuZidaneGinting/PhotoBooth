import React from 'react';
import '../../styles/landing.css';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import AboutBand from './AboutBand';
import FeaturesBand from './FeaturesBand';
import TemplateGallery from './TemplateGallery';
import HowItWorksBand from './HowItWorksBand';
import CoupleRoomSection from './CoupleRoomSection';
import FinalCTA from './FinalCTA';
import Footer from './Footer';

export default function LandingPage({
  onStartPhotobox,
  onSelectTemplate,
  onStartOnlineRoom
}) {
  const handleExploreTemplates = () => {
    const el = document.getElementById('templates');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      {/* 1. Navbar (Warm Cream) */}
      <LandingNavbar
        onStartPhotobox={() => onStartPhotobox()}
      />

      {/* 2. Hero Section (Warm Cream) */}
      <HeroSection
        onStartPhotobox={() => onStartPhotobox()}
        onExploreTemplates={handleExploreTemplates}
      />

      {/* 3. Band Section 1: About "Made for Moments" (Split Red-Orange & Cream) */}
      <AboutBand />

      {/* 4. Band Section 2: Features (Ink Black) */}
      <FeaturesBand />

      {/* 5. Template Gallery "Selected Frames" (Warm Cream) */}
      <TemplateGallery
        onSelectTemplate={onSelectTemplate}
      />

      {/* 6. Band Section 3: How It Works (Signal Red-Orange) */}
      <HowItWorksBand />

      {/* 7. Online Couple Room "Miles Apart. One Memory." (Warm Cream) */}
      <CoupleRoomSection
        onStartOnlineRoom={onStartOnlineRoom}
      />

      {/* 8. Final CTA (Mustard Yellow) */}
      <FinalCTA
        onStartPhotobox={() => onStartPhotobox()}
      />

      {/* 9. Footer (Ink Black) */}
      <Footer
        onStartPhotobox={() => onStartPhotobox()}
      />
    </div>
  );
}
