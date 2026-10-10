import React, { useState, useEffect } from 'react';
import { Users, Plus, ArrowRight, Heart, Sparkles, Copy, Check, ShieldCheck, Camera } from 'lucide-react';
import { TEMPLATES } from '../../data/templates';

export default function RoomJoinCreate({
  onCreateRoom,
  onJoinRoom,
  initialRoomCode = ''
}) {
  const [activeTab, setActiveTab] = useState(initialRoomCode ? 'JOIN' : 'CREATE');
  const [userName, setUserName] = useState('');
  const [roomCodeInput, setRoomCodeInput] = useState(initialRoomCode || '');
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [photoCount, setPhotoCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const maxSlots = selectedTemplate.slots?.length || 1;
  const effectiveCount = Math.min(photoCount, maxSlots);

  useEffect(() => {
    if (initialRoomCode) {
      setRoomCodeInput(initialRoomCode.toUpperCase());
      setActiveTab('JOIN');
    }
  }, [initialRoomCode]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const name = userName.trim() || 'Host';
    setIsLoading(true);
    setErrorMessage('');
    try {
      await onCreateRoom(name, selectedTemplate, effectiveCount);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal membuat room.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    const name = userName.trim() || 'Partner';
    const code = roomCodeInput.trim().toUpperCase();
    if (!code) {
      setErrorMessage('Silakan masukkan Kode Room.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      await onJoinRoom(code, name);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal bergabung ke room.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="room-join-create-container">
      <div className="room-welcome-hero">
        <div className="couple-heart-badge">
          <Heart size={24} className="heart-icon animate-pulse" />
        </div>
        <h2 className="hero-title">Couple Online Photobox (LDR)</h2>
        <p className="hero-subtext">
          Dua orang di tempat berbeda dapat mengambil foto bersama dalam satu frame photobox secara realtime.
        </p>
      </div>

      <div className="room-action-card">
        {/* Tab Switcher */}
        <div className="room-tabs-nav">
          <button
            type="button"
            className={`room-tab-btn ${activeTab === 'CREATE' ? 'active' : ''}`}
            onClick={() => { setActiveTab('CREATE'); setErrorMessage(''); }}
          >
            <Plus size={16} />
            <span>Buat Room Baru (Host)</span>
          </button>
          <button
            type="button"
            className={`room-tab-btn ${activeTab === 'JOIN' ? 'active' : ''}`}
            onClick={() => { setActiveTab('JOIN'); setErrorMessage(''); }}
          >
            <Users size={16} />
            <span>Gabung Room (Partner)</span>
          </button>
        </div>

        {errorMessage && (
          <div className="room-alert-error">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tab CREATE */}
        {activeTab === 'CREATE' && (
          <form onSubmit={handleCreateSubmit} className="room-form">
            <div className="form-group">
              <label>Nama Anda (Host)</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Contoh: Dio"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Pilih Template Frame</label>
              <div className="room-template-mini-grid">
                {TEMPLATES.map((tpl) => {
                  const isSelected = selectedTemplate.id === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      className={`mini-tpl-card ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedTemplate(tpl)}
                    >
                      <img src={tpl.image} alt={tpl.name} crossOrigin="anonymous" />
                      <div className="mini-tpl-info">
                        <span className="mini-tpl-name">{tpl.name}</span>
                        <span className="mini-tpl-badge">{tpl.slots?.length || 1} Foto</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label>Jumlah Foto Sesi ({effectiveCount} dari maks {maxSlots} Slot)</label>
              <div className="count-buttons-grid">
                {Array.from({ length: maxSlots }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`btn-count-pill ${effectiveCount === num ? 'active' : ''}`}
                    onClick={() => setPhotoCount(num)}
                  >
                    {num} {maxSlots <= 4 ? 'Foto' : ''}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isLoading}
            >
              <Plus size={18} />
              <span>{isLoading ? 'Menyiapkan Room...' : 'Buat Room & Dapatkan Kode'}</span>
            </button>
          </form>
        )}

        {/* Tab JOIN */}
        {activeTab === 'JOIN' && (
          <form onSubmit={handleJoinSubmit} className="room-form">
            <div className="form-group">
              <label>Kode Room (6 Karakter)</label>
              <input
                type="text"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder="Contoh: A7K9P2"
                className="form-input room-code-input"
                maxLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label>Nama Anda (Partner)</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Contoh: Sarah"
                className="form-input"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isLoading}
            >
              <ArrowRight size={18} />
              <span>{isLoading ? 'Menghubungkan...' : 'Masuk ke Room'}</span>
            </button>
          </form>
        )}

        <div className="room-footer-note">
          <ShieldCheck size={14} className="text-emerald" />
          <span>Kamera tetap privat di browser masing-masing. Hanya foto capture yang dikirim ke room.</span>
        </div>
      </div>
    </div>
  );
}
