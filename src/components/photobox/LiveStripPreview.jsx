import React from 'react';
import { getSlotPoints } from '../../utils/canvasRenderer';
import { getCssPolygonClip, getSvgPolygonPoints } from '../../utils/perspectiveTransform';

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

  return (
    <div className="live-strip-preview-wrapper">
      <div
        className="live-strip-canvas-box"
        style={{
          aspectRatio: `${width} / ${height}`,
          backgroundColor: template.backgroundColor || '#111827',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Layer 1: Slot Photos & Placeholders with Polygon Clipping */}
        {slots.map((slot, idx) => {
          const isUnused = idx >= maxTarget;
          const photoSrc = isUnused ? null : photos[slot.id];
          const isActive = !isUnused && idx === currentSlotIndex && highlightActive;
          const points = getSlotPoints(slot);

          // Calculate bounding box of polygon for CSS positioning
          const xs = points.map(p => p.x);
          const ys = points.map(p => p.y);
          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          const minY = Math.min(...ys);
          const maxY = Math.max(...ys);

          // Center of polygon
          const cx = (minX + maxX) / 2;
          const cy = (minY + maxY) / 2;

          const clipPath = getCssPolygonClip(points, width, height);

          return (
            <React.Fragment key={slot.id || idx}>
              {/* Photo layer clipped to exact quadrilateral */}
              <div
                className={`live-polygon-slot ${isUnused ? 'unused-slot' : ''} ${isActive ? 'active-slot' : ''}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: clipPath,
                  WebkitClipPath: clipPath,
                  zIndex: 2,
                  cursor: !isUnused && onSlotClick ? 'pointer' : 'default',
                  backgroundColor: photoSrc ? 'transparent' : (isActive ? 'rgba(236, 72, 153, 0.25)' : 'rgba(255, 255, 255, 0.15)')
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
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${((cx / width) * 100).toFixed(2)}%`,
                      top: `${((cy / height) * 100).toFixed(2)}%`,
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none'
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
            </React.Fragment>
          );
        })}

        {/* Layer 2: Template PNG Frame Overlay */}
        {template.image && (
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
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Layer 3: SVG Active Border Guides & Debug Overlay */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 4,
            pointerEvents: 'none'
          }}
        >
          {slots.map((slot, idx) => {
            const isUnused = idx >= maxTarget;
            const isActive = !isUnused && idx === currentSlotIndex && highlightActive;
            const points = getSlotPoints(slot);
            const polyPointsStr = points.map(p => `${p.x},${p.y}`).join(' ');

            return (
              <g key={`svg-guide-${slot.id || idx}`}>
                {/* Active slot animated stroke */}
                {isActive && (
                  <polygon
                    points={polyPointsStr}
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth={width > 900 ? "6" : "4"}
                    strokeDasharray="12, 6"
                    className="active-polygon-dash"
                  />
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
