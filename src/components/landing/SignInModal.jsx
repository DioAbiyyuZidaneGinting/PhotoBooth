import React, { useState } from 'react';
import { X, Sparkles, LogIn, Check } from 'lucide-react';

export default function SignInModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Sparkles size={20} color="#155CB5" />
          <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em', color: '#155CB5', textTransform: 'uppercase' }}>
            PHOTOBOX STUDIO
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', fontWeight: 800, color: '#0B2854', marginBottom: '0.5rem' }}>
          Welcome Back
        </h3>
        <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.75rem', lineHeight: 1.5 }}>
          Sign in to save your custom photostrips, sync templates across devices, and manage couple rooms.
        </p>

        {submitted ? (
          <div style={{
            background: '#EAF3FF',
            padding: '1.25rem',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#155CB5',
            fontWeight: 700
          }}>
            <Check size={22} color="#155CB5" strokeWidth={3} />
            <span>Success! Welcome to Photobox Studio.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0B2854', marginBottom: '0.4rem' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{
                  width: '100%',
                  padding: '0.85rem 1.1rem',
                  borderRadius: '14px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  color: '#0B2854'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: '#0B2854',
                color: '#ffffff',
                border: 'none',
                padding: '0.9rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                marginTop: '0.5rem',
                boxShadow: '0 8px 20px rgba(11, 40, 84, 0.25)'
              }}
            >
              <LogIn size={18} />
              <span>Continue with Email</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
