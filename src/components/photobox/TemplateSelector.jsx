import React from 'react';
import { Check, ArrowLeft, Sparkles, Camera } from 'lucide-react';

/**
 * TemplateSelector — Step 2 dalam flow baru.
 * Hanya menampilkan template yang sesuai dengan photoCount yang sudah dipilih user.
 *
 * Props:
 *   - photoCount: number (3 | 4 | 6) — sudah dipilih di Step 1
 *   - templates: Array — daftar template yang sudah difilter (photoCount cocok)
 *   - selectedTemplate: object | null
 *   - onSelectTemplate: (template) => void
 *   - onBack: () => void — kembali ke pemilihan jumlah foto
 *   - onProceed: () => void — lanjut ke kamera
 */
export default function TemplateSelector({
  photoCount,
  templates = [],
  selectedTemplate,
  onSelectTemplate,
  onBack,
  onProceed
}) {
  const canProceed = Boolean(selectedTemplate);

  return (
    <div className="template-selector-v2">
      {/* Header */}
      <div className="ts-header">
        <button
          type="button"
          className="ts-back-btn"
          onClick={onBack}
          title="Kembali ke pemilihan jumlah foto"
        >
          <ArrowLeft size={18} />
          <span>Ganti Jumlah Foto</span>
        </button>
        <div className="ts-title-group">
          <Sparkles size={18} className="text-pink" />
          <h3 className="ts-title">Pilih Template {photoCount} Foto</h3>
          <span className="ts-count-badge">{templates.length} template tersedia</span>
        </div>
      </div>

      {/* Template Grid */}
      {templates.length === 0 ? (
        <div className="ts-empty">
          <Camera size={36} className="text-muted" />
          <p>Belum ada template untuk {photoCount} foto.</p>
        </div>
      ) : (
        <div className="ts-grid">
          {templates.map((tpl) => {
            const isSelected = selectedTemplate?.id === tpl.id;

            return (
              <button
                key={tpl.id}
                type="button"
                className={`ts-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectTemplate(tpl)}
                aria-label={`Pilih ${tpl.name} — ${tpl.photoCount} foto`}
                aria-pressed={isSelected}
              >
                {/* Thumbnail */}
                <div className="ts-thumb-wrap">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="ts-thumb-img"
                    crossOrigin="anonymous"
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Selected badge */}
                  {isSelected && (
                    <div className="ts-selected-badge">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}

                  {/* Photo count pill */}
                  <span className="ts-photo-count-pill">
                    {tpl.photoCount} Foto
                  </span>
                </div>

                {/* Info */}
                <div className="ts-card-info">
                  <span className="ts-card-name">{tpl.name}</span>
                  <span className="ts-card-sub">{tpl.subtitle || `${tpl.photoCount} Photo Slots`}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Proceed Button */}
      {canProceed && (
        <div className="ts-proceed-bar">
          <div className="ts-selected-info">
            <Check size={14} className="text-emerald" />
            <span>
              <strong>{selectedTemplate.name}</strong> dipilih — {selectedTemplate.photoCount} foto
            </span>
          </div>
          <button
            type="button"
            className="btn-proceed-camera"
            onClick={onProceed}
          >
            <Camera size={18} />
            <span>Lanjut ke Kamera</span>
          </button>
        </div>
      )}
    </div>
  );
}
