import React from 'react';
import { Check, Circle, Camera, User, Users } from 'lucide-react';

export default function SlotProgressIndicator({
  slots = [],
  photoCount = null,
  currentSlotIndex = 0,
  capturedPhotos = {},
  slotAssignments = null,
  participants = null,
  isCapturing = false,
  onSelectSlot = null,
  readOnly = false
}) {
  if (!slots || slots.length === 0) return null;

  const targetCount = photoCount ? Math.min(photoCount, slots.length) : slots.length;
  const activeSlots = slots.slice(0, targetCount);
  const filledCount = Object.keys(capturedPhotos).filter(id => activeSlots.some(s => s.id === id)).length;

  return (
    <div className="slot-progress-container">
      <div className="slot-progress-header">
        <div className="progress-title-group">
          <Camera size={16} className="text-pink" />
          <span className="progress-title">
            Progress Pengambilan: <strong>Foto {Math.min(currentSlotIndex + 1, targetCount)}</strong> dari {targetCount}
          </span>
        </div>
        <span className="progress-count-pill">
          {filledCount} / {targetCount} Terisi
        </span>
      </div>

      <div className="slot-chips-row">
        {activeSlots.map((slot, index) => {
          const isFilled = Boolean(capturedPhotos[slot.id]);
          const isActive = index === currentSlotIndex;
          const assignedRole = slotAssignments ? slotAssignments[slot.id] : null;
          
          let roleLabel = '';
          if (assignedRole === 'HOST') {
            roleLabel = participants?.host?.name || 'Host';
          } else if (assignedRole === 'PARTNER') {
            roleLabel = participants?.partner?.name || 'Partner';
          }

          return (
            <button
              key={slot.id}
              type="button"
              className={`slot-chip-btn ${isFilled ? 'filled' : ''} ${isActive ? 'active' : ''} ${isCapturing && isActive ? 'pulse' : ''}`}
              onClick={() => {
                if (!readOnly && onSelectSlot) {
                  onSelectSlot(index);
                }
              }}
              title={`${slot.label || `Slot ${index + 1}`} - ${isFilled ? 'Sudah Terisi' : isActive ? 'Sedang Diambil' : 'Belum Terisi'}`}
              disabled={readOnly}
            >
              <div className="slot-chip-icon">
                {isFilled ? (
                  <Check size={14} className="icon-check" />
                ) : isActive ? (
                  <span className="active-dot" />
                ) : (
                  <Circle size={10} className="icon-empty" />
                )}
              </div>

              <div className="slot-chip-text">
                <span className="slot-chip-num">Foto {index + 1}</span>
                {roleLabel && (
                  <span className={`slot-chip-role ${assignedRole === 'HOST' ? 'role-host' : 'role-partner'}`}>
                    <User size={10} /> {roleLabel}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
