import React from 'react';
import { Sparkles, CheckCircle2, Maximize2 } from 'lucide-react';
import PhotoActions from './PhotoActions';

export default function PhotoResult({
  finalPhoto,
  selectedTemplate,
  onRetake,
  onPrint
}) {
  if (!finalPhoto || !finalPhoto.dataUrl) return null;

  return (
    <div className="photo-result-container">
      <div className="result-header">
        <div className="result-title-badge">
          <CheckCircle2 size={18} className="text-success" />
          <span>Hasil Photobox Anda Siap!</span>
        </div>
        <p className="result-subtitle">
          Template: <strong>{selectedTemplate?.name || 'Custom'}</strong> &bull; Resolusi:{' '}
          {finalPhoto.width} &times; {finalPhoto.height} px
        </p>
      </div>

      {/* Frame Preview Wrapper */}
      <div className="result-preview-wrapper">
        <div className="result-aspect-box">
          <img
            src={finalPhoto.dataUrl}
            alt="Hasil Foto Photobox Final"
            className="result-final-image"
          />
        </div>
      </div>

      {/* Actions */}
      <PhotoActions
        finalPhoto={finalPhoto}
        onRetake={onRetake}
        onPrint={onPrint}
      />
    </div>
  );
}
