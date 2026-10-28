import React from 'react';
import { getSlotPoints } from '../../utils/canvasRenderer';

export default function LiveStripPreview({
  template,
  photos = {},
  photoCount = null,
  currentSlotIndex = 0,
  highlightActive = true,
  onSlotClick = null,
  debugMode = false
}) {
  if (!template) return null;

  const width = template.width || 1024;
  const height = template.height || 1536;
  const slots = template.slots || [];
  const maxTarget = photoCount ? Math.min(photoCount, slots.length) : slots.length;
  const isTransparentFrame = Boolean(template.isTransparentFrame);

  return (
    <div className="live-strip-preview-wrapper">
      <div
        className="live-strip-canvas-box"
        style={{
          aspectRatio: `${width} / ${height}`,
          backgroundColor: template.backgroundColor || '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Layer 1: Base Frame (untuk frame opak/solid yang ada di bawah foto) */}
        {template.image && !isTransparentFrame && (
          <img
            src={template.image}
            alt={template.name}
            className="live-strip-frame-base"
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              pointerEvents: 'none',
              objectFit: 'fill'
            }}
          />
        )}

        {/* Layer 2: Slot Photos & Placeholders */}
        {slots.map((slot, idx) => {
          const isUnused = idx >= maxTarget;
          // Mendukung foto yang diindeks berdasarkan slot.id, slot-${idx+1}, atau angka index
          const photoSrc = isUnused
            ? null
            : (photos[slot.id] || photos[`slot-${idx + 1}`] || photos[idx] || (Array.isArray(photos) ? photos[idx] : null));
          const isActive = !isUnused && idx === currentSlotIndex && highlightActive;
          const points = getSlotPoints(slot);

          // Hitung batas bounding box pixel
          const xs = points.map(p => p.x);
          const ys = points.map(p => p.y);
          const minX = slot.x !== undefined ? slot.x : Math.min(...xs);
          const minY = slot.y !== undefined ? slot.y : Math.min(...ys);
          const slotW = Math.max(1, slot.width !== undefined ? slot.width : Math.max(...xs) - minX);
          const slotH = Math.max(1, slot.height !== undefined ? slot.height : Math.max(...ys) - minY);

          const shape = slot.shape || (slot.radius > 0 ? 'roundedRect' : (slot.rotation ? 'polygon' : 'rect'));
          const radius = slot.radius || 0;
          const rotation = slot.rotation || 0;
          const fit = slot.fit || 'cover';

          // Clipping & Border Radius styling
          let clipPath = 'none';
          let borderRadius = '0';

          if (shape === 'roundedRect' && radius > 0) {
            // Rounded rectangle radius adaptif proporsional
            borderRadius = `${((radius / slotW) * 100).toFixed(2)}% / ${((radius / slotH) * 100).toFixed(2)}%`;
          } else if (shape === 'polygon' && points && points.length >= 4) {
            // Polygon clipping path relatif terhadap slot bounding box
            const relativePoints = points.map(p => ({
              x: ((p.x - minX) / slotW) * 100,
              y: ((p.y - minY) / slotH) * 100
            }));
            clipPath = `polygon(${relativePoints.map(p => `${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`).join(', ')})`;
          }

          // Slot z-index:
          // Jika frame transparan, slot berada di zIndex 1 (di bawah bingkai dekoratif)
          // Jika frame opak, slot berada di zIndex 2 (di atas placeholder putih template)
          const slotZIndex = isTransparentFrame ? 1 : 2;

          return (
            <div
              key={slot.id || `slot-${idx + 1}`}
              className={`live-polygon-slot ${isUnused ? 'unused-slot' : ''} ${isActive ? 'active-slot' : ''}`}
              style={{
                position: 'absolute',
                left: `${((minX / width) * 100).toFixed(4)}%`,
                top: `${((minY / height) * 100).toFixed(4)}%`,
                width: `${((slotW / width) * 100).toFixed(4)}%`,
                height: `${((slotH / height) * 100).toFixed(4)}%`,
                clipPath: clipPath,
                WebkitClipPath: clipPath,
                borderRadius: borderRadius,
                transform: rotation !== 0 ? `rotate(${rotation}deg)` : 'none',
                transformOrigin: 'center center',
                zIndex: slotZIndex,
                cursor: !isUnused && onSlotClick ? 'pointer' : 'default',
                overflow: 'hidden'
              }}
              onClick={() => !isUnused && onSlotClick && onSlotClick(idx)}
              title={isUnused ? `${slot.label || `Slot ${idx + 1}`} (Tidak Digunakan)` : `${slot.label || `Foto ${idx + 1}`} ${photoSrc ? '(Terisi)' : '(Kosong)'}`}
            >
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={`Foto ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: fit,
                    display: 'block'
                  }}
                />
              ) : (
                <div
                  className="empty-slot-white-placeholder"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive ? 'rgba(236, 72, 153, 0.18)' : 'transparent',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {!isUnused && (
                    <>
                      <div className={`slot-badge-circle ${isActive ? 'pulse-active' : ''}`}>
                        {idx + 1}
                      </div>
                      {isActive && (
                        <span className="active-tag-pill">Target {idx + 1}</span>
                      )}
                    </>
                  )}
                  {isUnused && (
                    <span className="unused-tag">Off</span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Layer 3: Frame Overlay Transparan (HANYA jika template memang memiliki cutouts transparan) */}
        {template.image && isTransparentFrame && (
          <img
            src={template.image}
            alt={template.name}
            className="live-strip-frame-overlay"
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 3,
              pointerEvents: 'none',
              objectFit: 'fill'
            }}
          />
        )}

        {/* Layer 4: Optional Decorative Secondary Overlay */}
        {template.overlayImage && (
          <img
            src={template.overlayImage}
            alt={template.name}
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 4,
              pointerEvents: 'none',
              objectFit: 'fill'
            }}
          />
        )}

        {/* Layer 5: SVG Active Border Guides & Debug Overlay */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        >
          {slots.map((slot, idx) => {
            const isUnused = idx >= maxTarget;
            const isActive = !isUnused && idx === currentSlotIndex && highlightActive;
            const points = getSlotPoints(slot);
            const polyPointsStr = points.map(p => `${p.x},${p.y}`).join(' ');

            const minX = slot.x !== undefined ? slot.x : Math.min(...points.map(p => p.x));
            const minY = slot.y !== undefined ? slot.y : Math.min(...points.map(p => p.y));
            const slotW = slot.width !== undefined ? slot.width : Math.max(...points.map(p => p.x)) - minX;
            const slotH = slot.height !== undefined ? slot.height : Math.max(...points.map(p => p.y)) - minY;
            const shape = slot.shape || (slot.radius > 0 ? 'roundedRect' : (slot.rotation ? 'polygon' : 'rect'));
            const radius = slot.radius || 0;
            const rotation = slot.rotation || 0;

            const rotateTransform = rotation !== 0
              ? `rotate(${rotation} ${minX + slotW / 2} ${minY + slotH / 2})`
              : undefined;

            return (
              <g key={`svg-guide-${slot.id || idx}`} transform={rotateTransform}>
                {/* Active slot animated stroke */}
                {isActive && (
                  shape === 'roundedRect' && radius > 0 ? (
                    <rect
                      x={minX}
                      y={minY}
                      width={slotW}
                      height={slotH}
                      rx={radius}
                      ry={radius}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth={width > 900 ? "6" : "4"}
                      strokeDasharray="12, 6"
                      className="active-polygon-dash"
                    />
                  ) : shape === 'polygon' ? (
                    <polygon
                      points={polyPointsStr}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth={width > 900 ? "6" : "4"}
                      strokeDasharray="12, 6"
                      className="active-polygon-dash"
                    />
                  ) : (
                    <rect
                      x={minX}
                      y={minY}
                      width={slotW}
                      height={slotH}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth={width > 900 ? "6" : "4"}
                      strokeDasharray="12, 6"
                      className="active-polygon-dash"
                    />
                  )
                )}

                {/* Debug points overlay */}
                {debugMode && (
                  <g className="debug-points-layer">
                    <polygon
                      points={polyPointsStr}
                      fill="rgba(59, 130, 246, 0.2)"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                    {points.map((pt, pIdx) => (
                      <g key={`pt-${pIdx}`}>
                        <circle cx={pt.x} cy={pt.y} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                        <text
                          x={pt.x + 10}
                          y={pt.y - 10}
                          fill="#ffffff"
                          fontSize="20"
                          fontWeight="bold"
                          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
                        >
                          {`P${pIdx + 1} (${pt.x}, ${pt.y})`}
                        </text>
                      </g>
                    ))}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
