import React from 'react';
import { Camera, Film, LayoutGrid, ArrowRight, Heart, Sparkles } from 'lucide-react';

const PHOTO_COUNT_CONFIGS = [
  {
    count: 2,
    label: '2 FOTO',
    tag: '★ 2 PHOTOS',
    description: 'Dua foto intim untuk pasangan atau sahabat sejati',
    icon: Heart,
    colorScheme: 'rose',
    slots: 2
  },
  {
    count: 3,
    label: '3 FOTO',
    tag: '★ 3 PHOTOS',
    description: 'Tiga foto vertikal dalam satu frame strip klasik',
    icon: Camera,
    colorScheme: 'red',
    slots: 3
  },
  {
    count: 4,
    label: '4 FOTO',
    tag: '★ 4 PHOTOS',
    description: 'Empat foto proporsional strip & format grid',
    icon: Film,
    colorScheme: 'black',
    slots: 4
  },
  {
    count: 5,
    label: '5 FOTO',
    tag: '★ 5 PHOTOS',
    description: 'Lima foto kolase cerita dinamis & lanskap sinematik',
    icon: Sparkles,
    colorScheme: 'blue',
    slots: 5
  },
  {
    count: 6,
    label: '6 FOTO',
    tag: '★ 6 PHOTOS',
    description: 'Enam foto kolase penuh memori & momen seru',
    icon: LayoutGrid,
    colorScheme: 'yellow',
    slots: 6
  }
];

export default function PhotoCountSelector({ onSelectCount }) {
  return (
    <div className="photo-count-selector-page">
      <div className="photo-count-hero">
        <div className="hero-icon-badge">
          <Camera size={26} />
        </div>
        <span className="photo-count-step-tag">
          ★ LANGKAH 1 DARI 3 &bull; PILIH JUMLAH FOTO
        </span>
        <h2 className="photo-count-title">
          Berapa <span className="photo-count-title-italic">Foto?</span>
        </h2>
        <p className="photo-count-subtitle">
          Pilih jumlah foto untuk sesi fotomu. Setiap pilihan memiliki template frame eksklusif yang siap dicetak.
        </p>
      </div>

      <div className="photo-count-grid">
        {PHOTO_COUNT_CONFIGS.map((cfg) => {
          const IconComp = cfg.icon;
          return (
            <button
              key={cfg.count}
              type="button"
              className={`photo-count-card card-theme-${cfg.colorScheme}`}
              onClick={() => onSelectCount(cfg.count)}
              aria-label={`Pilih ${cfg.count} foto`}
            >
              {/* Header card: Pill tag + Icon bubble */}
              <div className="count-card-top-bar">
                <span className="count-card-pill-tag">{cfg.tag}</span>
                <span className="count-card-icon-bubble">
                  <IconComp size={16} />
                </span>
              </div>

              {/* Visual Display Box */}
              <div className="count-card-visual-box">
                <div className="count-card-big-number">{cfg.count}</div>
                <div className="count-card-slots-preview" aria-hidden="true">
                  {Array.from({ length: cfg.slots }).map((_, idx) => (
                    <span key={idx} className="slot-preview-tile" />
                  ))}
                </div>
              </div>

              {/* Text content */}
              <div className="count-card-text-body">
                <h3 className="count-card-title">{cfg.label}</h3>
                <p className="count-card-desc">{cfg.description}</p>
              </div>

              {/* Bottom Action Pill */}
              <div className="count-card-action-pill">
                <span>Pilih {cfg.count} Foto</span>
                <ArrowRight size={16} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

