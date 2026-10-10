import React, { useState } from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { TEMPLATES } from '../../data/templates';
import { BrushUnderline, RetroSpark } from './Doodles';

export default function TemplateGallery({ onSelectTemplate }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const tabs = [
    { id: 'ALL', label: 'All Frames', count: TEMPLATES.length },
    { id: 3, label: '3 Photos', count: TEMPLATES.filter(t => t.photoCount === 3).length },
    { id: 4, label: '4 Photos', count: TEMPLATES.filter(t => t.photoCount === 4).length },
    { id: 6, label: '6 Photos', count: TEMPLATES.filter(t => t.photoCount === 6).length },
  ];

  const displayedTemplates = activeTab === 'ALL'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.photoCount === activeTab);

  // Alternating solid colors for template card preview backgrounds
  const bgClasses = ['v2-preview-bg-red', 'v2-preview-bg-black', 'v2-preview-bg-yellow'];

  return (
    <section id="templates" className="v2-band-templates">
      <div className="v2-templates-container">
        {/* Header Row */}
        <div className="v2-templates-header-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <RetroSpark size={16} color="#E8431F" />
              <span className="v2-section-label-red">FEATURED FRAMES</span>
            </div>

            <h2 className="v2-heading-serif">
              Find your perfect frame
            </h2>

            <div style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              <BrushUnderline color="#E8431F" width={240} height={15} />
            </div>

            <p style={{ fontSize: '1.1rem', color: 'var(--c-muted-cream)' }}>
              Choose a layout that matches your moment.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="v2-filter-tabs-row">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`v2-filter-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
                <span className="v2-filter-tab-count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid with solid color preview boxes */}
        <div className="v2-templates-grid">
          {displayedTemplates.map((tpl, idx) => {
            const previewBgClass = bgClasses[idx % bgClasses.length];

            return (
              <div key={tpl.id} className="v2-template-card">
                {/* Solid Colored Preview Holder */}
                <div className={`v2-template-preview-box ${previewBgClass}`}>
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: '#111111',
                    color: '#FFFBF2',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    border: '1.5px solid #FFFBF2'
                  }}>
                    {tpl.photoCount} Photos
                  </span>

                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="v2-template-img"
                    loading="lazy"
                  />
                </div>

                {/* Card Info */}
                <div className="v2-template-card-info">
                  <h3 className="v2-template-card-title">{tpl.name}</h3>
                  <p className="v2-template-card-sub">{tpl.subtitle || `${tpl.photoCount} Photo slots`}</p>

                  <button
                    type="button"
                    className="v2-btn-use-frame"
                    onClick={() => onSelectTemplate(tpl)}
                    id={`btn-use-frame-${tpl.id}`}
                  >
                    <Camera size={16} />
                    <span>Use This Frame</span>
                    <ArrowRight size={16} className="arrow-icon" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
