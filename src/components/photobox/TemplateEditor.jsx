import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, Trash2, Maximize2, Save, X, RotateCw, Image as ImageIcon, 
  Layers, Check, Sparkles, Sliders, ArrowUp, ArrowDown, Target
} from 'lucide-react';
import { getSlotPoints } from '../../utils/canvasRenderer';
import { getCssPolygonClip } from '../../utils/perspectiveTransform';

export default function TemplateEditor({
  initialTemplate = null,
  onSaveTemplate,
  onClose
}) {
  const [templateName, setTemplateName] = useState(initialTemplate?.name || 'Custom PNG Template');
  const [templateSubtitle, setTemplateSubtitle] = useState(initialTemplate?.subtitle || 'Custom 4-Corner Frame');
  const [templateImage, setTemplateImage] = useState(initialTemplate?.image || '/templates/template-4-v4.png');
  const [imageDimensions, setImageDimensions] = useState({
    width: initialTemplate?.width || 1024,
    height: initialTemplate?.height || 1536
  });

  const [slots, setSlots] = useState(() => {
    if (initialTemplate?.slots) {
      return initialTemplate.slots.map(s => ({
        ...s,
        points: getSlotPoints(s)
      }));
    }
    return [
      { id: 'slot-1', label: 'Foto 1', points: [{ x: 100, y: 100 }, { x: 450, y: 100 }, { x: 450, y: 550 }, { x: 100, y: 550 }] },
      { id: 'slot-2', label: 'Foto 2', points: [{ x: 550, y: 100 }, { x: 900, y: 100 }, { x: 900, y: 550 }, { x: 550, y: 550 }] },
      { id: 'slot-3', label: 'Foto 3', points: [{ x: 100, y: 650 }, { x: 450, y: 650 }, { x: 450, y: 1100 }, { x: 100, y: 1100 }] },
      { id: 'slot-4', label: 'Foto 4', points: [{ x: 550, y: 650 }, { x: 900, y: 650 }, { x: 900, y: 1100 }, { x: 550, y: 1100 }] }
    ];
  });

  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [showTestPhotos, setShowTestPhotos] = useState(true);
  const [dragCorner, setDragCorner] = useState(null); // { slotIndex, cornerIndex, startX, startY, origPoints }

  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle upload PNG baru
  const handleUploadPNG = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const imgUrl = ev.target.result;
      const img = new Image();
      img.onload = () => {
        setImageDimensions({
          width: img.naturalWidth || 1024,
          height: img.naturalHeight || 1536
        });
        setTemplateImage(imgUrl);
        setTemplateName(file.name.replace(/\.[^/.]+$/, ''));
      };
      img.src = imgUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Tambah Slot Baru
  const handleAddSlot = () => {
    const newId = `slot-${Date.now().toString(36)}`;
    const w = imageDimensions.width;
    const h = imageDimensions.height;
    const newSlot = {
      id: newId,
      label: `Foto ${slots.length + 1}`,
      points: [
        { x: Math.round(w * 0.1), y: Math.round(h * 0.1) },
        { x: Math.round(w * 0.5), y: Math.round(h * 0.1) },
        { x: Math.round(w * 0.5), y: Math.round(h * 0.45) },
        { x: Math.round(w * 0.1), y: Math.round(h * 0.45) }
      ]
    };
    setSlots([...slots, newSlot]);
    setSelectedSlotIndex(slots.length);
  };

  // Hapus Slot
  const handleDeleteSlot = (index) => {
    if (slots.length <= 1) {
      alert('Template harus memiliki minimal 1 photo slot.');
      return;
    }
    const updated = slots.filter((_, i) => i !== index);
    setSlots(updated);
    setSelectedSlotIndex(Math.max(0, index - 1));
  };

  // Geser urutan slot (Up/Down)
  const handleMoveSlotOrder = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= slots.length) return;
    const updated = [...slots];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSlots(updated);
    setSelectedSlotIndex(targetIdx);
  };

  // Update koordinat corner titik spesifik
  const updateCornerPoint = (cornerIdx, axis, value) => {
    if (selectedSlotIndex < 0 || selectedSlotIndex >= slots.length) return;
    const updated = [...slots];
    const pts = [...updated[selectedSlotIndex].points];
    pts[cornerIdx] = {
      ...pts[cornerIdx],
      [axis]: Number(value)
    };
    updated[selectedSlotIndex] = {
      ...updated[selectedSlotIndex],
      points: pts
    };
    setSlots(updated);
  };

  // Update label slot
  const updateSlotLabel = (val) => {
    if (selectedSlotIndex < 0 || selectedSlotIndex >= slots.length) return;
    const updated = [...slots];
    updated[selectedSlotIndex] = {
      ...updated[selectedSlotIndex],
      label: val
    };
    setSlots(updated);
  };

  // Mouse drag handler untuk corner point
  const handleCornerMouseDown = (e, slotIndex, cornerIndex) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedSlotIndex(slotIndex);

    setDragCorner({
      slotIndex,
      cornerIndex,
      startX: e.clientX,
      startY: e.clientY,
      origPoints: JSON.parse(JSON.stringify(slots[slotIndex].points))
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragCorner || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scaleX = imageDimensions.width / rect.width;
      const scaleY = imageDimensions.height / rect.height;

      const deltaX = (e.clientX - dragCorner.startX) * scaleX;
      const deltaY = (e.clientY - dragCorner.startY) * scaleY;

      const { slotIndex, cornerIndex, origPoints } = dragCorner;
      const updated = [...slots];
      const pts = [...updated[slotIndex].points];

      const newX = Math.max(0, Math.min(imageDimensions.width, Math.round(origPoints[cornerIndex].x + deltaX)));
      const newY = Math.max(0, Math.min(imageDimensions.height, Math.round(origPoints[cornerIndex].y + deltaY)));

      pts[cornerIndex] = { x: newX, y: newY };
      updated[slotIndex] = { ...updated[slotIndex], points: pts };

      setSlots(updated);
    };

    const handleMouseUp = () => {
      setDragCorner(null);
    };

    if (dragCorner) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragCorner, imageDimensions, slots]);

  // Simpan Konfigurasi Template
  const handleSave = () => {
    if (slots.length === 0) {
      alert('Template harus memiliki minimal 1 photo slot.');
      return;
    }

    const newTemplate = {
      id: initialTemplate?.id || `template-custom-${Date.now()}`,
      name: templateName.trim() || 'Custom Frame',
      subtitle: `${slots.length} Photo Slots`,
      photoCount: slots.length,
      image: templateImage,
      width: imageDimensions.width,
      height: imageDimensions.height,
      tag: 'Custom',
      slots: slots.map((s, idx) => ({
        ...s,
        id: s.id || `slot-${idx + 1}`,
        label: s.label || `Foto ${idx + 1}`,
        points: s.points
      }))
    };

    onSaveTemplate(newTemplate);
  };

  const currentSlot = slots[selectedSlotIndex] || slots[0];
  const cornerNames = ['P1: Top-Left', 'P2: Top-Right', 'P3: Bottom-Right', 'P4: Bottom-Left'];

  return (
    <div className="template-editor-overlay">
      <div className="template-editor-modal">
        {/* Header */}
        <div className="editor-modal-header">
          <div className="editor-header-title">
            <Layers size={20} className="text-pink" />
            <div>
              <h3>Four-Corner Template &amp; Slot Editor</h3>
              <p className="editor-subtext">Kalibrasi koordinat 4 titik quadrilateral untuk setiap photo slot</p>
            </div>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} title="Tutup">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Left Canvas & Right Controls */}
        <div className="editor-modal-body">
          {/* Kolom Kiri: Visual Interactive Canvas */}
          <div className="editor-canvas-column">
            <div className="editor-canvas-toolbar">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon size={16} /> Ganti PNG Frame
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png"
                style={{ display: 'none' }}
                onChange={handleUploadPNG}
              />

              <button
                type="button"
                className={`btn btn-sm ${showTestPhotos ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setShowTestPhotos(!showTestPhotos)}
              >
                <Sparkles size={16} /> {showTestPhotos ? 'Test Foto: ON' : 'Test Foto: OFF'}
              </button>

              <span className="dimension-badge">
                {imageDimensions.width} &times; {imageDimensions.height} px
              </span>
            </div>

            <div className="editor-canvas-viewport">
              <div
                ref={containerRef}
                className="editor-interactive-canvas"
                style={{
                  aspectRatio: `${imageDimensions.width} / ${imageDimensions.height}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Layer 1: Slot polygons */}
                {slots.map((slot, idx) => {
                  const isSelected = idx === selectedSlotIndex;
                  const clip = getCssPolygonClip(slot.points, imageDimensions.width, imageDimensions.height);

                  return (
                    <div
                      key={slot.id || idx}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        clipPath: clip,
                        WebkitClipPath: clip,
                        backgroundColor: isSelected ? 'rgba(236, 72, 153, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                        zIndex: 2,
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedSlotIndex(idx)}
                    >
                      {showTestPhotos && (
                        <img
                          src={`https://picsum.photos/seed/photobox-${idx + 1}/500/600`}
                          alt={`Sample ${idx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                        />
                      )}
                    </div>
                  );
                })}

                {/* Layer 2: Template PNG Overlay */}
                {templateImage && (
                  <img
                    src={templateImage}
                    alt="Template Overlay"
                    className="editor-template-overlay"
                    crossOrigin="anonymous"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 3,
                      pointerEvents: 'none'
                    }}
                  />
                )}

                {/* Layer 3: SVG Interactive Handles */}
                <svg
                  viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 4
                  }}
                >
                  {slots.map((slot, idx) => {
                    const isSelected = idx === selectedSlotIndex;
                    const pts = slot.points;
                    const polyStr = pts.map(p => `${p.x},${p.y}`).join(' ');

                    return (
                      <g key={`svg-slot-${idx}`}>
                        <polygon
                          points={polyStr}
                          fill="none"
                          stroke={isSelected ? '#ec4899' : '#3b82f6'}
                          strokeWidth={isSelected ? '4' : '2'}
                          strokeDasharray={isSelected ? '10, 5' : 'none'}
                        />

                        {isSelected && pts.map((pt, pIdx) => (
                          <g
                            key={`corner-${pIdx}`}
                            style={{ cursor: 'grab' }}
                            onMouseDown={(e) => handleCornerMouseDown(e, idx, pIdx)}
                          >
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="12"
                              fill="#ec4899"
                              stroke="#ffffff"
                              strokeWidth="3"
                            />
                            <text
                              x={pt.x + 14}
                              y={pt.y + 6}
                              fill="#ffffff"
                              fontSize="24"
                              fontWeight="bold"
                              filter="drop-shadow(0 1px 3px rgba(0,0,0,0.9))"
                            >
                              P{pIdx + 1}
                            </text>
                          </g>
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Pengaturan & Slot List */}
          <div className="editor-sidebar-column">
            {/* Meta Template Info */}
            <div className="editor-card">
              <h4 className="editor-card-title">Informasi Template</h4>
              <div className="form-group">
                <label>Nama Template</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="form-input"
                  placeholder="Contoh: Horror 4 Polaroid"
                />
              </div>
            </div>

            {/* Daftar Slots */}
            <div className="editor-card">
              <div className="slots-header">
                <h4 className="editor-card-title">Daftar Photo Slot ({slots.length})</h4>
                <button
                  type="button"
                  className="btn btn-primary btn-xs"
                  onClick={handleAddSlot}
                >
                  <Plus size={14} /> Tambah Slot
                </button>
              </div>

              <div className="slots-pills-list">
                {slots.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    className={`slot-list-item ${idx === selectedSlotIndex ? 'active' : ''}`}
                    onClick={() => setSelectedSlotIndex(idx)}
                  >
                    <span className="slot-idx-num">{idx + 1}</span>
                    <span className="slot-list-name">{s.label || `Slot ${idx + 1}`}</span>
                    <div className="slot-item-actions">
                      <button
                        type="button"
                        className="btn-icon-xs"
                        onClick={(e) => { e.stopPropagation(); handleMoveSlotOrder(idx, -1); }}
                        disabled={idx === 0}
                        title="Geser ke atas"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon-xs"
                        onClick={(e) => { e.stopPropagation(); handleMoveSlotOrder(idx, 1); }}
                        disabled={idx === slots.length - 1}
                        title="Geser ke bawah"
                      >
                        <ArrowDown size={12} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon-xs danger"
                        onClick={(e) => { e.stopPropagation(); handleDeleteSlot(idx); }}
                        title="Hapus slot ini"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Four Corners Calibration Input */}
            {currentSlot && (
              <div className="editor-card">
                <h4 className="editor-card-title">
                  Kalibrasi 4 Titik: <strong>{currentSlot.label || `Slot ${selectedSlotIndex + 1}`}</strong>
                </h4>

                <div className="form-group">
                  <label>Label Slot</label>
                  <input
                    type="text"
                    value={currentSlot.label || ''}
                    onChange={(e) => updateSlotLabel(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="corners-grid-editor">
                  {currentSlot.points.map((pt, pIdx) => (
                    <div key={`corner-inp-${pIdx}`} className="corner-input-group" style={{ marginBottom: '10px' }}>
                      <span className="corner-point-title" style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ec4899' }}>
                        {cornerNames[pIdx] || `P${pIdx + 1}`}
                      </span>
                      <div className="form-grid-2">
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ fontSize: '0.75rem' }}>X (px)</label>
                          <input
                            type="number"
                            value={pt.x}
                            onChange={(e) => updateCornerPoint(pIdx, 'x', e.target.value)}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ fontSize: '0.75rem' }}>Y (px)</label>
                          <input
                            type="number"
                            value={pt.y}
                            onChange={(e) => updateCornerPoint(pIdx, 'y', e.target.value)}
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="editor-modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button type="button" className="btn btn-primary btn-save-template" onClick={handleSave}>
            <Save size={18} />
            <span>Simpan Template &amp; Terapkan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
