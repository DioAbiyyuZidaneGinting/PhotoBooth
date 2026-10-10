import React from 'react';
import { Camera, Image, Layers, Sparkles } from 'lucide-react';

const PHOTO_COUNT_CONFIGS = [
  {
    count: 3,
    label: '3 FOTO',
    description: 'Tiga foto dalam satu frame',
    icon: '📸',
    gradient: 'gradient-3foto'
  },
  {
    count: 4,
    label: '4 FOTO',
    description: 'Empat foto dalam satu frame',
    icon: '🎞️',
    gradient: 'gradient-4foto'
  },
  {
    count: 6,
    label: '6 FOTO',
    description: 'Enam foto dalam satu frame',
    icon: '🖼️',
    gradient: 'gradient-6foto'
  }
];

export default function PhotoCountSelector({ onSelectCount }) {
  return (
    <div className="photo-count-selector-page">
      <div className="photo-count-hero">
        <div className="hero-icon-ring">
          <Camera size={36} className="text-pink" />
        </div>
        <h2 className="photo-count-title">Berapa Foto?</h2>
        <p className="photo-count-subtitle">
          Pilih jumlah foto untuk sesi fotomu. Setiap pilihan memiliki template frame eksklusif.
        </p>
      </div>

      <div className="photo-count-grid">
        {PHOTO_COUNT_CONFIGS.map((cfg) => (
          <button
            key={cfg.count}
            type="button"
            className={`photo-count-card ${cfg.gradient}`}
            onClick={() => onSelectCount(cfg.count)}
            aria-label={`Pilih ${cfg.count} foto`}
          >
            <div className="count-card-glow" />
            <div className="count-card-inner">
              <span className="count-card-emoji">{cfg.icon}</span>
              <div className="count-card-number">{cfg.count}</div>
              <div className="count-card-label">{cfg.label}</div>
              <div className="count-card-desc">{cfg.description}</div>
            </div>
            <div className="count-card-arrow">→</div>
          </button>
        ))}
      </div>
    </div>
  );
}
