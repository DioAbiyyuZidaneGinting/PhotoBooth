import React from 'react';
import { Heart, Wifi, ArrowRight } from 'lucide-react';
import { RetroSpark, BrushUnderline } from './Doodles';

export default function CoupleRoomSection({ onStartOnlineRoom }) {
  return (
    <section id="couple-room" className="v2-band-couple-room">
      <div className="v2-couple-container">
        {/* Left Column: Story & CTA */}
        <div className="v2-couple-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RetroSpark size={16} color="#E8431F" />
            <span className="v2-section-label-red">ONLINE COUPLE ROOM</span>
          </div>

          <h2 className="v2-heading-serif">
            Miles apart. <br />
            One{' '}
            <span className="accent-italic">
              memory.
              <span style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }}>
                <BrushUnderline color="#E8431F" width={160} height={12} />
              </span>
            </span>
          </h2>

          <p style={{ fontSize: '1.15rem', color: 'var(--c-muted-cream)', lineHeight: 1.65, maxWidth: '520px' }}>
            Create a shared photobooth experience with someone special, even when you are in different places.
            Connect via a unique room code, sync shutter timers, and capture turns seamlessly in a single shared photostrip.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              className="v2-btn-pill-yellow"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
              onClick={onStartOnlineRoom}
              id="cta-create-couple-room"
            >
              <Heart size={18} color="#E8431F" fill="#E8431F" />
              <span>Create a Room</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Right Column: Handcrafted Flat Dual Devices Visual */}
        <div className="v2-couple-right">
          <div className="v2-devices-stage">
            {/* Room Code Badge */}
            <div className="v2-room-code-badge">
              ROOM CODE: <strong>LDR-95</strong>
            </div>

            {/* Device 1 (Left) */}
            <div className="v2-device-card left">
              <div className="v2-device-avatar-circle">
                A
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111111' }}>You (Host)</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                <Wifi size={12} />
                <span>Connected</span>
              </div>
            </div>

            {/* Shared Strip in the middle */}
            <div className="v2-shared-strip-box">
              <img
                src="/hero/photostrip-friends.jpg"
                alt="Shared couple photostrip"
                style={{ width: '100%', borderRadius: 2, display: 'block', border: '1px solid #111111' }}
                loading="lazy"
              />
              <div style={{ textAlign: 'center', marginTop: 6, fontSize: '0.65rem', fontWeight: 900, color: '#111111' }}>
                SYNCED STRIP
              </div>
            </div>

            {/* Device 2 (Right) */}
            <div className="v2-device-card right">
              <div className="v2-device-avatar-circle" style={{ background: '#E8431F' }}>
                B
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111111' }}>Partner</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                <Wifi size={12} />
                <span>In Room</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
