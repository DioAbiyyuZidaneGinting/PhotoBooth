import React, { useState } from 'react';
import { Download, Printer, RotateCcw, Check, Share2, Copy } from 'lucide-react';
import { generateFilename } from '../../utils/canvasRenderer';

export default function PhotoActions({
  finalPhoto,
  onRetake,
  onPrint
}) {
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (!finalPhoto || !finalPhoto.dataUrl) return;

    const link = document.createElement('a');
    link.href = finalPhoto.dataUrl;
    link.download = generateFilename(downloadFormat);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = async () => {
    if (!finalPhoto || !finalPhoto.blob) return;
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': finalPhoto.blob
          })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert('Fitur salin gambar tidak didukung di browser ini.');
      }
    } catch (err) {
      console.warn('Gagal menyalin gambar:', err);
    }
  };

  return (
    <div className="photo-actions-panel">
      <div className="action-buttons-grid">
        {/* Tombol Foto Ulang */}
        <button
          type="button"
          className="btn btn-secondary btn-retake"
          onClick={onRetake}
          title="Ambil foto ulang"
        >
          <RotateCcw size={18} />
          <span>Foto Ulang</span>
        </button>

        {/* Tombol Download */}
        <button
          type="button"
          className="btn btn-primary btn-download"
          onClick={handleDownload}
          title="Unduh hasil photobox ke perangkat"
        >
          <Download size={18} />
          <span>Download ({downloadFormat.toUpperCase()})</span>
        </button>

        {/* Tombol Print */}
        <button
          type="button"
          className="btn btn-accent btn-print"
          onClick={onPrint}
          title="Cetak foto sekarang"
        >
          <Printer size={18} />
          <span>Cetak / Print</span>
        </button>
      </div>

      <div className="action-sub-options">
        <div className="format-selector">
          <span className="format-label">Format:</span>
          <button
            type="button"
            className={`btn-pill ${downloadFormat === 'png' ? 'active' : ''}`}
            onClick={() => setDownloadFormat('png')}
          >
            PNG (Crisp)
          </button>
          <button
            type="button"
            className={`btn-pill ${downloadFormat === 'jpg' ? 'active' : ''}`}
            onClick={() => setDownloadFormat('jpg')}
          >
            JPG
          </button>
        </div>

        {navigator.clipboard && window.ClipboardItem && (
          <button
            type="button"
            className="btn-text-action"
            onClick={handleCopyImage}
          >
            {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Gambar'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
