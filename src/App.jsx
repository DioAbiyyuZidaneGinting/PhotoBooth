import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Sparkles, RefreshCw, Aperture, Heart, Volume2, VolumeX, 
  ShieldCheck, Edit3, ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

import CameraPreview from './components/photobox/CameraPreview';
import PhotoCountSelector from './components/photobox/PhotoCountSelector';
import TemplateSelector from './components/photobox/TemplateSelector';
import TemplateEditor from './components/photobox/TemplateEditor';
import SlotProgressIndicator from './components/photobox/SlotProgressIndicator';
import LiveStripPreview from './components/photobox/LiveStripPreview';
import PhotoResult from './components/photobox/PhotoResult';
import PhotoCanvas from './components/photobox/PhotoCanvas';

import RoomJoinCreate from './components/online/RoomJoinCreate';
import RoomView from './components/online/RoomView';

import { TEMPLATES, getTemplatesByPhotoCount } from './data/templates';
import { captureRawVideo, renderPhotoboxComposite } from './utils/canvasRenderer';
import { sounds } from './utils/audio';
import { roomService } from './services/roomService';
import LandingPage from './components/landing/LandingPage';

export default function App() {
  // --- View Mode: 'LANDING' | 'PHOTOBOX' ---
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('room')) return 'PHOTOBOX';
    return 'LANDING';
  });

  // --- App Mode: 'LOCAL' | 'ONLINE' ---
  const [appMode, setAppMode] = useState('LOCAL');

  // =====================================================
  // NEW FLOW STATE MACHINE
  // =====================================================
  // 'SELECT_COUNT'     → Step 1: User memilih jumlah foto (3 / 4 / 6)
  // 'SELECT_TEMPLATE'  → Step 2: User memilih template (filtered by photoCount)
  // 'CAMERA_READY'     → Step 3: Kamera aktif, siap capture
  // 'COUNTDOWN'        → Dalam proses countdown + capture
  // 'RESULT'           → Foto selesai, tampilkan hasil
  const [localStep, setLocalStep] = useState('SELECT_COUNT');

  // Jumlah foto yang dipilih user (3 | 4 | 6)
  const [selectedPhotoCount, setSelectedPhotoCount] = useState(null);

  // Template yang dipilih (harus cocok dengan selectedPhotoCount)
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Template editor
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // --- Templates List (bisa diperluas dengan custom templates) ---
  const [templatesList, setTemplatesList] = useState(() => {
    try {
      const saved = localStorage.getItem('photobox_custom_templates');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...TEMPLATES];
      }
    } catch (e) {}
    return TEMPLATES;
  });

  // --- Capture State ---
  const [capturedPhotos, setCapturedPhotos] = useState({}); // { [slotId]: dataUrl }
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(3);
  const [currentCountdown, setCurrentCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Camera hardware status
  const [cameraStatus, setCameraStatus] = useState('CONNECTING');
  const [cameraErrorMessage, setCameraErrorMessage] = useState('');
  const [activeDeviceId, setActiveDeviceId] = useState('');
  const [isMirrored, setIsMirrored] = useState(true);

  // Debug slot mode
  const [debugMode, setDebugMode] = useState(false);

  // Composite result
  const [finalPhoto, setFinalPhoto] = useState(null);

  // --- Online Room States ---
  const [roomActive, setRoomActive] = useState(false);
  const [roomState, setRoomState] = useState(null);
  const [myRole, setMyRole] = useState('HOST');
  const [initialRoomCodeFromUrl, setInitialRoomCodeFromUrl] = useState('');

  const videoRef = useRef(null);
  const countdownTimerRef = useRef(null);

  // Derived state — slot config dari template yang dipilih
  const slots = selectedTemplate?.slots || [];
  const maxSlots = slots.length || 1;
  // effectivePhotoCount SELALU sama dengan selectedPhotoCount (karena template sudah matching)
  const effectivePhotoCount = selectedPhotoCount || maxSlots;

  // Cek parameter ?room=... pada URL saat pertama kali dimuat
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      setInitialRoomCodeFromUrl(roomParam.toUpperCase());
      setAppMode('ONLINE');
    }
  }, []);

  // Sinkronisasi status roomService
  useEffect(() => {
    const unsubState = roomService.on('stateChange', (state) => {
      setRoomState(state);
      if (state.templateId) {
        const found = templatesList.find(t => t.id === state.templateId);
        if (found) {
          setSelectedTemplate(found);
          if (state.photoCount) {
            setSelectedPhotoCount(state.photoCount);
          }
        }
      }
    });

    return () => {
      unsubState();
    };
  }, [templatesList]);

  // Efek selebrasi confetti saat foto selesai dicomposite
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b']
      });
    } catch (e) {}
  };

  // =====================================================
  // FLOW HANDLERS
  // =====================================================

  /** Step 1 → Step 2: User memilih jumlah foto */
  const handleSelectPhotoCount = (count) => {
    setSelectedPhotoCount(count);
    // Reset template jika tidak cocok dengan count baru
    if (selectedTemplate && selectedTemplate.photoCount !== count) {
      setSelectedTemplate(null);
    }
    setLocalStep('SELECT_TEMPLATE');
    resetCaptureState();
  };

  /** Step 2 → Step 3: User memilih template, lanjut ke kamera */
  const handleSelectTemplate = (tpl) => {
    setSelectedTemplate(tpl);
    resetCaptureState();
  };

  /** Step 2 tombol "Lanjut ke Kamera" */
  const handleProceedToCamera = () => {
    if (!selectedTemplate) return;
    setLocalStep('CAMERA_READY');
    resetCaptureState();
  };

  /** Kembali dari Step 2 → Step 1 */
  const handleBackToCountSelect = () => {
    setLocalStep('SELECT_COUNT');
    // Tidak reset selectedPhotoCount/selectedTemplate — user bisa memilih ulang
  };

  /** Kembali dari kamera → Step 2 (pilih template) */
  const handleBackToTemplateSelect = () => {
    setLocalStep('SELECT_TEMPLATE');
    resetCaptureState();
  };

  const resetCaptureState = () => {
    setCapturedPhotos({});
    setCurrentSlotIndex(0);
    setFinalPhoto(null);
    setCurrentCountdown(null);
    setIsCapturing(false);
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  };

  // =====================================================
  // CAPTURE SEQUENCE
  // =====================================================

  const handleStartCapture = () => {
    if (cameraStatus !== 'READY' || isCapturing) return;

    setIsCapturing(true);
    setLocalStep('COUNTDOWN');
    let timeLeft = countdownSeconds;
    setCurrentCountdown(timeLeft);

    if (soundEnabled) {
      sounds.playCountdownBeep(false);
    }

    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    countdownTimerRef.current = setInterval(async () => {
      timeLeft -= 1;

      if (timeLeft > 0) {
        setCurrentCountdown(timeLeft);
        if (soundEnabled) {
          sounds.playCountdownBeep(false);
        }
      } else if (timeLeft === 0) {
        setCurrentCountdown(0);
        if (soundEnabled) {
          sounds.playCountdownBeep(true);
          sounds.playShutterSound();
        }

        if (videoRef.current) {
          const snapshot = captureRawVideo(videoRef.current, isMirrored);
          const activeSlot = slots[currentSlotIndex] || slots[0];

          const newPhotos = {
            ...capturedPhotos,
            [activeSlot.id]: snapshot
          };
          setCapturedPhotos(newPhotos);

          const nextIndex = currentSlotIndex + 1;
          if (nextIndex >= effectivePhotoCount) {
            // Semua foto sudah diambil — buat composite
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
            setCurrentCountdown(null);
            setIsCapturing(false);

            const finalPhotosMap = {};
            slots.slice(0, effectivePhotoCount).forEach((s) => {
              if (newPhotos[s.id]) {
                finalPhotosMap[s.id] = newPhotos[s.id];
              }
            });

            try {
              const compositeResult = await renderPhotoboxComposite(finalPhotosMap, selectedTemplate);
              setFinalPhoto(compositeResult);
              setLocalStep('RESULT');
              triggerCelebration();
            } catch (err) {
              console.error('Composite generation error:', err);
              alert('Gagal menghasilkan composite foto: ' + err.message);
              setLocalStep('CAMERA_READY');
            }
          } else {
            // Lanjut ke foto berikutnya
            setCurrentSlotIndex(nextIndex);
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
            setCurrentCountdown(null);
            setIsCapturing(false);
            setLocalStep('CAMERA_READY');
          }
        }
      }
    }, 1000);
  };

  // Retake — kembali ke kamera, pertahankan template & photoCount
  const handleRetake = () => {
    resetCaptureState();
    setLocalStep('CAMERA_READY');
  };

  // Ganti template saat di kamera (hanya template dengan photoCount yang sama)
  const handleChangeTemplateInCamera = (tpl) => {
    if (tpl.photoCount !== selectedPhotoCount) return; // Guard
    setSelectedTemplate(tpl);
    resetCaptureState();
  };

  // Cetak
  const handlePrint = () => {
    window.print();
  };

  // Simpan Template Kustom dari Editor
  const handleSaveCustomTemplate = (newTemplate) => {
    const updated = [newTemplate, ...templatesList.filter(t => t.id !== newTemplate.id)];
    setTemplatesList(updated);
    setSelectedTemplate(newTemplate);
    setSelectedPhotoCount(newTemplate.photoCount || newTemplate.slots?.length || 3);
    resetCaptureState();
    setIsEditorOpen(false);

    try {
      const customOnes = updated.filter(t => t.tag === 'Custom');
      localStorage.setItem('photobox_custom_templates', JSON.stringify(customOnes));
    } catch (e) {}
  };

  // Online Room Actions
  const handleCreateRoom = async (hostName, templateToUse, chosenCount) => {
    const tpl = templateToUse || selectedTemplate;
    const count = chosenCount || (tpl?.photoCount) || effectivePhotoCount;
    await roomService.createRoom(hostName, tpl, count);
    setMyRole('HOST');
    setRoomActive(true);
  };

  const handleJoinRoom = async (roomCode, partnerName) => {
    await roomService.joinRoom(roomCode, partnerName);
    setMyRole('PARTNER');
    setRoomActive(true);
  };

  const handleLeaveRoom = () => {
    roomService.leaveRoom();
    setRoomActive(false);
    setRoomState(null);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // --- Landing Page Action Handlers ---
  const handleStartPhotoboxFromLanding = (customCount = null) => {
    setAppMode('LOCAL');
    if (customCount) {
      setSelectedPhotoCount(customCount);
      setLocalStep('SELECT_TEMPLATE');
    } else {
      setLocalStep('SELECT_COUNT');
    }
    setCurrentView('PHOTOBOX');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTemplateFromLanding = (template) => {
    setSelectedPhotoCount(template.photoCount);
    setSelectedTemplate(template);
    resetCaptureState();
    setAppMode('LOCAL');
    setLocalStep('CAMERA_READY');
    setCurrentView('PHOTOBOX');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOnlineRoomFromLanding = () => {
    setAppMode('ONLINE');
    setCurrentView('PHOTOBOX');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered templates for current photoCount
  const filteredTemplates = selectedPhotoCount
    ? templatesList.filter(t => t.photoCount === selectedPhotoCount)
    : [];

  // isInCamera: apakah user sedang di tahap capture (kamera aktif)
  const isInCamera = localStep === 'CAMERA_READY' || localStep === 'COUNTDOWN';

  // --- View: LANDING PAGE ---
  if (currentView === 'LANDING') {
    return (
      <>
        <LandingPage
          onStartPhotobox={handleStartPhotoboxFromLanding}
          onSelectTemplate={handleSelectTemplateFromLanding}
          onStartOnlineRoom={handleStartOnlineRoomFromLanding}
          onOpenEditor={() => setIsEditorOpen(true)}
        />
        {isEditorOpen && (
          <TemplateEditor
            initialTemplate={selectedTemplate}
            onSaveTemplate={handleSaveCustomTemplate}
            onClose={() => setIsEditorOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="photobox-app">
      {/* Printable Area Isolasi */}
      {finalPhoto && (
        <div className="printable-only-area">
          <img
            src={finalPhoto.dataUrl}
            alt="Photobox Print"
            className="printable-image"
          />
        </div>
      )}

      {/* Screen App Layout */}
      <div className="screen-content">
        {/* Navigation Bar */}
        <header className="app-navbar">
          <div className="navbar-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Back to Home Landing Button */}
              <button
                type="button"
                className="btn-back-home"
                onClick={() => {
                  setCurrentView('LANDING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title="Kembali ke Landing Page"
              >
                <ArrowLeft size={15} />
                <span>Home</span>
              </button>

              <div 
                className="navbar-brand"
                onClick={() => {
                  setCurrentView('LANDING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
              >
                <div className="brand-icon-box">
                  <Camera size={22} className="text-pink" />
                </div>
                <div className="brand-text">
                  <span className="brand-title">PHOTOBOX STUDIO</span>
                  <span className="brand-badge">MULTI-SLOT &amp; ONLINE</span>
                </div>
              </div>
            </div>

            {/* Mode Switcher Nav */}
            <div className="app-mode-switcher-nav">
              <button
                type="button"
                className={`mode-nav-btn ${appMode === 'LOCAL' ? 'active' : ''}`}
                onClick={() => { setAppMode('LOCAL'); }}
              >
                <Camera size={16} />
                <span>Local Photobox</span>
              </button>
              <button
                type="button"
                className={`mode-nav-btn ${appMode === 'ONLINE' ? 'active' : ''}`}
                onClick={() => { setAppMode('ONLINE'); }}
              >
                <Heart size={16} className={appMode === 'ONLINE' ? 'text-pink' : ''} />
                <span>Couple Online (LDR)</span>
              </button>
            </div>

            {/* Right Meta Controls */}
            <div className="navbar-meta">
              <button
                type="button"
                className={`btn-editor-open ${debugMode ? 'active' : ''}`}
                onClick={() => setDebugMode(!debugMode)}
                title={debugMode ? 'Nonaktifkan Debug Slot' : 'Aktifkan Debug Slot & Corner Points'}
                style={{
                  backgroundColor: debugMode ? 'rgba(59, 130, 246, 0.2)' : undefined,
                  borderColor: debugMode ? '#3b82f6' : undefined,
                  color: debugMode ? '#60a5fa' : undefined
                }}
              >
                <Sparkles size={15} />
                <span className="editor-btn-label">{debugMode ? 'Debug: ON' : 'Debug Slot'}</span>
              </button>

              <button
                type="button"
                className="btn-editor-open"
                onClick={() => setIsEditorOpen(true)}
                title="Buka Visual Slot Editor"
              >
                <Edit3 size={15} />
                <span className="editor-btn-label">Editor Slot</span>
              </button>

              <button
                type="button"
                className={`sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Suara Aktif' : 'Suara Dimatikan'}
              >
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                <span className="sound-toggle-label">{soundEnabled ? 'Audio On' : 'Muted'}</span>
              </button>

              <div className="status-indicator-pill">
                <span className={`status-indicator-dot ${cameraStatus === 'READY' ? 'ready' : 'connecting'}`}></span>
                <span className="status-indicator-text">
                  {cameraStatus === 'READY' ? 'Camera Ready' : cameraStatus === 'ERROR' ? 'Camera Error' : 'Connecting'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content-container">

          {/* ================= MODE 1: LOCAL PHOTOBOX ================= */}
          {appMode === 'LOCAL' && (
            <>
              {/* STEP: RESULT */}
              {localStep === 'RESULT' && finalPhoto ? (
                <section className="result-section-view">
                  <PhotoResult
                    finalPhoto={finalPhoto}
                    selectedTemplate={selectedTemplate}
                    onRetake={handleRetake}
                    onPrint={handlePrint}
                  />
                </section>
              ) : localStep === 'SELECT_COUNT' ? (
                /* STEP 1: Pilih Jumlah Foto */
                <section className="select-count-section">
                  <PhotoCountSelector onSelectCount={handleSelectPhotoCount} />
                </section>
              ) : localStep === 'SELECT_TEMPLATE' ? (
                /* STEP 2: Pilih Template */
                <section className="select-template-section">
                  <TemplateSelector
                    photoCount={selectedPhotoCount}
                    templates={filteredTemplates}
                    selectedTemplate={selectedTemplate}
                    onSelectTemplate={handleSelectTemplate}
                    onBack={handleBackToCountSelect}
                    onProceed={handleProceedToCamera}
                  />
                </section>
              ) : (
                /* STEP 3: KAMERA — CAMERA_READY | COUNTDOWN */
                <section className="photobox-live-layout">
                  {/* Kolom Kiri: Live Camera Viewfinder */}
                  <div className="preview-column">
                    <div className="preview-card">
                      {/* Tombol kembali ke pilih template */}
                      <div className="camera-nav-row">
                        <button
                          type="button"
                          className="btn-back-template"
                          onClick={handleBackToTemplateSelect}
                          title="Kembali ke pilihan template"
                          disabled={isCapturing}
                        >
                          <ArrowLeft size={15} />
                          <span>Ganti Template</span>
                        </button>
                        <div className="camera-session-info">
                          <span className="session-template-name">{selectedTemplate?.name}</span>
                          <span className="session-photo-count">{effectivePhotoCount} Foto</span>
                        </div>
                      </div>

                      {/* Indikator Sequence Slot */}
                      <SlotProgressIndicator
                        slots={slots}
                        photoCount={effectivePhotoCount}
                        currentSlotIndex={currentSlotIndex}
                        capturedPhotos={capturedPhotos}
                        isCapturing={isCapturing}
                        onSelectSlot={(idx) => {
                          if (idx < effectivePhotoCount) {
                            setCurrentSlotIndex(idx);
                          }
                        }}
                      />

                      <div className="preview-card-body">
                        <CameraPreview
                          selectedTemplate={selectedTemplate}
                          photoCount={effectivePhotoCount}
                          currentSlotIndex={currentSlotIndex}
                          cameraStatus={cameraStatus}
                          setCameraStatus={setCameraStatus}
                          countdown={currentCountdown}
                          isCapturing={isCapturing}
                          videoRef={videoRef}
                          isMirrored={isMirrored}
                          setIsMirrored={setIsMirrored}
                          onStartCapture={handleStartCapture}
                          cameraErrorMessage={cameraErrorMessage}
                          setCameraErrorMessage={setCameraErrorMessage}
                          activeDeviceId={activeDeviceId}
                          setActiveDeviceId={setActiveDeviceId}
                          debugMode={debugMode}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan: Live Frame Preview & Kontrol */}
                  <div className="controls-column">
                    {/* Live Progressive Frame Preview */}
                    <div className="control-panel-card live-frame-panel">
                      <div className="panel-title-row">
                        <Sparkles size={16} className="text-pink" />
                        <h4 className="panel-title">Frame Photostrip Live</h4>
                        <span className="panel-badge-info">{effectivePhotoCount} Foto Aktif</span>
                      </div>

                      <LiveStripPreview
                        template={selectedTemplate}
                        photos={capturedPhotos}
                        photoCount={effectivePhotoCount}
                        currentSlotIndex={currentSlotIndex}
                        highlightActive={true}
                        debugMode={debugMode}
                        onSlotClick={(idx) => {
                          if (idx < effectivePhotoCount) {
                            setCurrentSlotIndex(idx);
                          }
                        }}
                      />
                    </div>

                    {/* Tombol Ambil Foto & Pengaturan */}
                    <div className="control-panel-card capture-actions-panel">
                      {/* Timer Countdown */}
                      <div className="capture-timer-selector">
                        <span className="timer-label">Timer Shutter:</span>
                        <div className="timer-buttons">
                          {[3, 5, 10].map((sec) => (
                            <button
                              key={sec}
                              type="button"
                              className={`btn-timer-pill ${countdownSeconds === sec ? 'active' : ''}`}
                              onClick={() => setCountdownSeconds(sec)}
                              disabled={isCapturing}
                            >
                              {sec}s
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tombol Utama: Ambil Foto Sequence */}
                      <button
                        type="button"
                        className={`btn-big-capture ${isCapturing ? 'capturing' : ''} ${cameraStatus !== 'READY' ? 'disabled' : ''}`}
                        onClick={handleStartCapture}
                        disabled={cameraStatus !== 'READY' || isCapturing}
                      >
                        <div className="capture-shutter-ring">
                          <Camera size={32} />
                        </div>
                        <div className="capture-text-group">
                          <span className="capture-main-title">
                            {isCapturing
                              ? `MENGAMBIL FOTO ${currentSlotIndex + 1} (${currentCountdown}s)`
                              : `AMBIL FOTO ${currentSlotIndex + 1} / ${effectivePhotoCount}`}
                          </span>
                          <span className="capture-sub-title">
                            {isCapturing
                              ? 'Bersiap & pasang senyum terbaikmu!'
                              : `Countdown ${countdownSeconds}s • Sesi ${effectivePhotoCount} foto`}
                          </span>
                        </div>
                      </button>

                      <div className="safety-note">
                        <ShieldCheck size={14} className="text-emerald" />
                        <span>
                          Sesi {effectivePhotoCount} foto • Otomatis composite setelah Foto {effectivePhotoCount} selesai
                        </span>
                      </div>
                    </div>

                    {/* Mini template switcher — hanya template dgn photoCount sama */}
                    {filteredTemplates.length > 1 && (
                      <div className="control-panel-card mini-template-switcher">
                        <div className="panel-title-row">
                          <Sparkles size={14} className="text-pink" />
                          <span className="panel-title" style={{ fontSize: '0.8rem' }}>
                            Ganti Template ({selectedPhotoCount} Foto)
                          </span>
                        </div>
                        <div className="mini-template-grid">
                          {filteredTemplates.map((tpl) => (
                            <button
                              key={tpl.id}
                              type="button"
                              className={`mini-template-btn ${selectedTemplate?.id === tpl.id ? 'active' : ''}`}
                              onClick={() => handleChangeTemplateInCamera(tpl)}
                              disabled={isCapturing}
                              title={tpl.name}
                            >
                              <img
                                src={tpl.image}
                                alt={tpl.name}
                                className="mini-template-img"
                                crossOrigin="anonymous"
                                draggable={false}
                              />
                              <span className="mini-template-name">{tpl.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ================= MODE 2: COUPLE ONLINE (LDR) ================= */}
          {appMode === 'ONLINE' && (
            <section className="online-mode-section">
              {roomActive && roomState ? (
                <RoomView
                  roomState={roomState}
                  template={selectedTemplate}
                  myRole={myRole}
                  onLeaveRoom={handleLeaveRoom}
                />
              ) : (
                <RoomJoinCreate
                  onCreateRoom={handleCreateRoom}
                  onJoinRoom={handleJoinRoom}
                  initialRoomCode={initialRoomCodeFromUrl}
                />
              )}
            </section>
          )}
        </main>

        {/* Modal Template & Slot Visual Editor */}
        {isEditorOpen && (
          <TemplateEditor
            initialTemplate={selectedTemplate}
            onSaveTemplate={handleSaveCustomTemplate}
            onClose={() => setIsEditorOpen(false)}
          />
        )}

        {/* Footer */}
        <footer className="app-footer">
          <p>
            Photobox Studio • Multi-Slot Frame &amp; Composite Engine • Local &amp; Online Couple Photobox
          </p>
        </footer>
      </div>
    </div>
  );
}
