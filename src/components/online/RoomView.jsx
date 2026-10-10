import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, Copy, Check, Share2, LogOut, Camera, Sparkles, Heart, 
  RotateCcw, RefreshCw, Aperture, User, Volume2, VolumeX, ShieldCheck, Download, Printer 
} from 'lucide-react';
import confetti from 'canvas-confetti';

import CameraPreview from '../photobox/CameraPreview';
import LiveStripPreview from '../photobox/LiveStripPreview';
import SlotProgressIndicator from '../photobox/SlotProgressIndicator';
import PhotoResult from '../photobox/PhotoResult';
import PhotoCanvas from '../photobox/PhotoCanvas';

import { captureRawVideo, renderPhotoboxComposite, compressImageDataUrl } from '../../utils/canvasRenderer';
import { sounds } from '../../utils/audio';
import { roomService } from '../../services/roomService';

export default function RoomView({
  roomState,
  template,
  myRole,
  onLeaveRoom
}) {
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [countdownSeconds, setCountdownSeconds] = useState(3);
  const [currentCountdown, setCurrentCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Camera states
  const [cameraStatus, setCameraStatus] = useState('CONNECTING');
  const [cameraErrorMessage, setCameraErrorMessage] = useState('');
  const [activeDeviceId, setActiveDeviceId] = useState('');
  const [isMirrored, setIsMirrored] = useState(true);

  // Final composite state
  const [finalPhoto, setFinalPhoto] = useState(null);

  const videoRef = useRef(null);
  const countdownTimerRef = useRef(null);

  const slots = template?.slots || [];
  const targetPhotoCount = roomState.photoCount ? Math.min(roomState.photoCount, slots.length) : Math.min(4, slots.length);
  const currentSlotIndex = roomState.currentSlotIndex || 0;
  const activeSlot = slots[currentSlotIndex] || slots[0];
  const assignedRole = roomState.slotAssignments?.[activeSlot?.id] || (currentSlotIndex % 2 === 0 ? 'HOST' : 'PARTNER');
  const isMyTurn = assignedRole === myRole;

  const hostName = roomState.participants?.host?.name || 'Host';
  const partnerName = roomState.participants?.partner?.name || 'Partner';
  const isPartnerConnected = roomState.participants?.partner?.connected;

  // Listen to remote countdown sync
  useEffect(() => {
    const unsubCountdown = roomService.on('countdownSync', (payload) => {
      if (!isMyTurn) {
        // Run simulated countdown display on the waiting partner's screen
        let count = payload.seconds || 3;
        setCurrentCountdown(count);
        const timer = setInterval(() => {
          count -= 1;
          if (count > 0) {
            setCurrentCountdown(count);
          } else {
            setCurrentCountdown(0);
            clearInterval(timer);
            setTimeout(() => setCurrentCountdown(null), 1000);
          }
        }, 1000);
      }
    });

    return () => {
      unsubCountdown();
    };
  }, [isMyTurn]);

  // Efek confetti saat selesai
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b']
      });
    } catch (e) {}
  };

  // Trigger capture foto saat giliran saya
  const handleStartCapture = () => {
    if (cameraStatus !== 'READY' || isCapturing || !isMyTurn) return;

    setIsCapturing(true);
    let timeLeft = countdownSeconds;
    setCurrentCountdown(timeLeft);

    // Broadcast countdown start ke partner
    roomService.startSlotCapture(currentSlotIndex, countdownSeconds);

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
        // Capture shutter
        setCurrentCountdown(0);
        if (soundEnabled) {
          sounds.playCountdownBeep(true);
          sounds.playShutterSound();
        }

        if (videoRef.current) {
          const rawSnapshot = captureRawVideo(videoRef.current, isMirrored);
          const compressed = await compressImageDataUrl(rawSnapshot, 1000, 0.85);

          // Submit ke room dengan batas targetPhotoCount
          roomService.submitSlotPhoto(activeSlot.id, compressed, targetPhotoCount);
        }
      } else {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
        setCurrentCountdown(null);
        setIsCapturing(false);
      }
    }, 1000);
  };

  // Generate composite saat target photoCount terpenuhi
  useEffect(() => {
    const filledCount = Object.keys(roomState.photos || {}).length;
    if (filledCount >= targetPhotoCount && targetPhotoCount > 0) {
      async function generateFinal() {
        try {
          const finalPhotos = {};
          slots.slice(0, targetPhotoCount).forEach((s) => {
            if (roomState.photos[s.id]) {
              finalPhotos[s.id] = roomState.photos[s.id];
            }
          });
          const result = await renderPhotoboxComposite(finalPhotos, template);
          setFinalPhoto(result);
          triggerCelebration();
        } catch (e) {
          console.error('Gagal generate final composite room:', e);
        }
      }
      generateFinal();
    } else {
      setFinalPhoto(null);
    }
  }, [roomState.photos, template, targetPhotoCount]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?room=${roomState.roomCode}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRetakeAll = () => {
    roomService.retakeAll();
    setFinalPhoto(null);
  };

  return (
    <div className="online-room-layout">
      {/* Header Room Bar */}
      <div className="room-top-header">
        <div className="room-code-badge-group">
          <div className="room-badge-pill">
            <Heart size={16} className="text-pink animate-pulse" />
            <span>Room: <strong>{roomState.roomCode}</strong></span>
          </div>

          <button
            type="button"
            className="btn-pill-copy"
            onClick={handleCopyLink}
            title="Salin tautan room"
          >
            {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
            <span>{copied ? 'Tautan Disalin!' : 'Bagikan Link'}</span>
          </button>
        </div>

        <div className="room-participants-status-row">
          <div className={`participant-chip ${roomState.participants?.host?.connected ? 'connected' : ''}`}>
            <User size={13} />
            <span>Host: <strong>{hostName}</strong> {myRole === 'HOST' ? '(Anda)' : ''}</span>
          </div>

          <div className={`participant-chip ${isPartnerConnected ? 'connected' : 'waiting'}`}>
            <User size={13} />
            <span>
              Partner: <strong>{isPartnerConnected ? partnerName : 'Menunggu...'}</strong> {myRole === 'PARTNER' ? '(Anda)' : ''}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-outline-danger btn-xs"
            onClick={onLeaveRoom}
            title="Tinggalkan Room"
          >
            <LogOut size={14} />
            <span>Keluar Room</span>
          </button>
        </div>
      </div>

      {/* Jika Room Selesai -> Tampilkan Final Photobox Result */}
      {finalPhoto ? (
        <div className="room-final-result-view">
          <div className="result-celebrate-banner">
            <Sparkles size={20} className="text-pink" />
            <h3>Photobox Couple Berhasil Dibuat Bersama!</h3>
          </div>
          <PhotoResult
            finalPhoto={finalPhoto}
            selectedTemplate={template}
            onRetake={handleRetakeAll}
            onPrint={() => window.print()}
          />
        </div>
      ) : (
        /* Main Dual Viewfinder & Live Frame Area */
        <div className="room-main-grid">
          {/* Kolom Kiri: Live Camera atau Waiting Screen */}
          <div className="room-action-column">
            {/* Indikator Slot Sequence */}
            <div className="room-progress-card">
              <SlotProgressIndicator
                slots={slots}
                photoCount={targetPhotoCount}
                currentSlotIndex={currentSlotIndex}
                capturedPhotos={roomState.photos}
                slotAssignments={roomState.slotAssignments}
                participants={roomState.participants}
                isCapturing={isCapturing}
                readOnly={true}
              />
            </div>

            {/* Viewfinder / Waiting Turn Card */}
            <div className="room-viewfinder-card">
              {isMyTurn ? (
                /* Giliran Anda */
                <div className="my-turn-container">
                  <div className="turn-alert-pill mine">
                    <Sparkles size={16} />
                    <span>Giliran Anda Mengambil <strong>Foto {currentSlotIndex + 1}</strong> dari {targetPhotoCount}!</span>
                  </div>

                  <CameraPreview
                    selectedTemplate={template}
                    photoCount={targetPhotoCount}
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
                  />

                  {/* Tombol Ambil Foto Giliran Anda */}
                  <div className="room-capture-trigger-box">
                    <button
                      type="button"
                      className={`btn-big-capture ${isCapturing ? 'capturing' : ''} ${cameraStatus !== 'READY' ? 'disabled' : ''}`}
                      onClick={handleStartCapture}
                      disabled={cameraStatus !== 'READY' || isCapturing}
                    >
                      <div className="capture-shutter-ring">
                        <Camera size={28} />
                      </div>
                      <div className="capture-text-group">
                        <span className="capture-main-title">
                          {isCapturing ? `MENGAMBIL FOTO (${currentCountdown}s)` : `AMBIL FOTO ${currentSlotIndex + 1} / ${targetPhotoCount}`}
                        </span>
                        <span className="capture-sub-title">
                          Countdown {countdownSeconds}s &bull; Foto otomatis terpasang ke frame bersama
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                /* Giliran Pasangan */
                <div className="partner-turn-container">
                  <div className="turn-alert-pill partner">
                    <User size={16} />
                    <span>
                      Giliran <strong>{assignedRole === 'HOST' ? hostName : partnerName}</strong> mengambil Foto {currentSlotIndex + 1} dari {targetPhotoCount}...
                    </span>
                  </div>

                  <div className="partner-waiting-backdrop">
                    <div className="waiting-radar-circle">
                      <div className="radar-wave" />
                      <Camera size={44} className="waiting-camera-icon" />
                    </div>

                    <h4 className="waiting-title">Menunggu Partner Mengambil Foto</h4>
                    <p className="waiting-desc">
                      Foto dari partner akan otomatis muncul di frame photobox secara realtime setelah diambil.
                    </p>

                    {currentCountdown !== null && (
                      <div className="sync-countdown-badge">
                        <span>Partner sedang menghitung mundur: <strong>{currentCountdown}s</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Live Photostrip Frame Preview */}
          <div className="room-preview-column">
            <div className="room-frame-card">
              <div className="frame-card-header">
                <Sparkles size={16} className="text-pink" />
                <h4>Live Photobox Strip</h4>
              </div>

              <div className="frame-card-body">
                <LiveStripPreview
                  template={template}
                  photos={roomState.photos}
                  photoCount={targetPhotoCount}
                  currentSlotIndex={currentSlotIndex}
                  highlightActive={true}
                />
              </div>

              <div className="frame-card-footer">
                <span>{template?.name} &bull; Sesi {targetPhotoCount} Foto (Maks {slots.length} Slot)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
