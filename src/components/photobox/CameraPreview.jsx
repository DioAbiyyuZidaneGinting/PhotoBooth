import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, RefreshCw, FlipHorizontal, AlertCircle, Sparkles, Video, Aperture } from 'lucide-react';
import Countdown from './Countdown';
import { getSlotPoints } from '../../utils/canvasRenderer';
import { getCssPolygonClip } from '../../utils/perspectiveTransform';

export default function CameraPreview({
  selectedTemplate,
  photoCount = null,
  currentSlotIndex = 0,
  cameraStatus,
  setCameraStatus,
  countdown,
  isCapturing,
  videoRef,
  isMirrored,
  setIsMirrored,
  onStartCapture,
  cameraErrorMessage,
  setCameraErrorMessage,
  activeDeviceId,
  setActiveDeviceId,
  debugMode = false
}) {
  const [videoDevices, setVideoDevices] = useState([]);
  const streamRef = useRef(null);

  const activeSlot = selectedTemplate?.slots?.[currentSlotIndex] || selectedTemplate?.slots?.[0];
  const maxSlots = selectedTemplate?.slots?.length || 1;
  const totalSlots = photoCount ? Math.min(photoCount, maxSlots) : maxSlots;

  const tplW = selectedTemplate?.width || 1024;
  const tplH = selectedTemplate?.height || 1536;

  // Active slot 4-corner points
  const activePoints = activeSlot ? getSlotPoints(activeSlot) : null;
  const activePolyStr = activePoints ? activePoints.map(p => `${p.x},${p.y}`).join(' ') : '';
  const activeClipPath = activePoints ? getCssPolygonClip(activePoints, tplW, tplH) : 'none';

  // Muat daftar hardware kamera
  const loadDevices = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((d) => d.kind === 'videoinput');
      setVideoDevices(cameras);
      if (cameras.length > 0 && !activeDeviceId) {
        setActiveDeviceId(cameras[0].deviceId);
      }
    } catch (e) {
      console.warn('Gagal memuat daftar perangkat kamera:', e);
    }
  };

  // Inisialisasi stream kamera
  const startCamera = async (deviceIdToUse) => {
    setCameraStatus('CONNECTING');
    setCameraErrorMessage('');

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraStatus('ERROR');
      setCameraErrorMessage('Browser Anda tidak mendukung Web Camera API atau tidak dalam secure context (HTTPS / localhost).');
      return;
    }

    try {
      const constraints = {
        audio: false,
        video: deviceIdToUse
          ? { deviceId: { exact: deviceIdToUse }, width: { ideal: 1920 }, height: { ideal: 1080 } }
          : { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            setCameraStatus('READY');
          }).catch((err) => {
            console.error('Video play error:', err);
            setCameraStatus('READY');
          });
        };
      } else {
        setCameraStatus('READY');
      }

      await loadDevices();
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraStatus('ERROR');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraErrorMessage('Izin akses kamera ditolak. Silakan klik izin kamera di browser.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraErrorMessage('Tidak ada perangkat kamera yang terdeteksi.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setCameraErrorMessage('Kamera sedang digunakan oleh aplikasi lain.');
      } else {
        setCameraErrorMessage(`Kamera tidak dapat diakses: ${err.message || 'Periksa koneksi kamera.'}`);
      }
    }
  };

  useEffect(() => {
    startCamera(activeDeviceId);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [activeDeviceId]);

  const handleSwitchCamera = (e) => {
    const newDeviceId = e.target.value;
    setActiveDeviceId(newDeviceId);
  };

  return (
    <div className="camera-preview-container">
      {/* Top Bar Info Slot */}
      <div className="camera-top-banner">
        <div className="banner-left">
          <Aperture size={16} className="text-pink animate-spin-slow" />
          <span className="banner-slot-title">
            FOTO <strong>{currentSlotIndex + 1}</strong> / {totalSlots}
          </span>
          <span className="banner-slot-sub">
            ({activeSlot?.label || `Slot ${currentSlotIndex + 1}`})
          </span>
        </div>
        <div className="banner-right">
          {cameraStatus === 'READY' && (
            <span className="banner-live-pill">
              <span className="pulse-dot" /> LIVE
            </span>
          )}
        </div>
      </div>

      {/* Aspect Ratio Box Wrapper (Matches Template Aspect Ratio) */}
      <div
        className="aspect-ratio-wrapper"
        style={{
          aspectRatio: `${tplW} / ${tplH}`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Layer 1: Full Live Video Feed in Background Viewfinder */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`camera-video-feed ${isMirrored ? 'mirrored' : ''}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />

        {/* Layer 2: Template PNG Frame Overlay with Semi-transparency for guidance */}
        {selectedTemplate && selectedTemplate.image && (
          <img
            src={selectedTemplate.image}
            alt={selectedTemplate.name}
            className="camera-template-overlay"
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'fill',
              zIndex: 2,
              pointerEvents: 'none',
              opacity: 0.88
            }}
          />
        )}

        {/* Layer 3: Highlighted Active Quadrilateral Slot Viewport */}
        {activePoints && (
          <div
            className="camera-active-slot-viewport"
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: activeClipPath,
              WebkitClipPath: activeClipPath,
              zIndex: 3,
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.6) inset',
              pointerEvents: 'none'
            }}
          >
            {/* Live Camera Feed explicitly focused inside active slot */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(236, 72, 153, 0.08)'
              }}
            />
          </div>
        )}

        {/* Layer 4: SVG Quadrilateral Active Outline Guide */}
        <svg
          viewBox={`0 0 ${tplW} ${tplH}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 4,
            pointerEvents: 'none'
          }}
        >
          {selectedTemplate?.slots?.map((slot, idx) => {
            const pts = getSlotPoints(slot);
            const polyStr = pts.map(p => `${p.x},${p.y}`).join(' ');
            const isActive = idx === currentSlotIndex;

            return (
              <g key={`cam-guide-${slot.id || idx}`}>
                {isActive ? (
                  <>
                    <polygon
                      points={polyStr}
                      fill="rgba(236, 72, 153, 0.15)"
                      stroke="#ec4899"
                      strokeWidth={tplW > 900 ? "6" : "4"}
                      strokeDasharray="14, 8"
                      className="active-polygon-dash"
                    />
                    {/* Corner Reticle Markers */}
                    {pts.map((pt, pIdx) => (
                      <circle
                        key={`cam-pt-${pIdx}`}
                        cx={pt.x}
                        cy={pt.y}
                        r="6"
                        fill="#ec4899"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    ))}
                  </>
                ) : (
                  <polygon
                    points={polyStr}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="2"
                    strokeDasharray="6, 6"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Layer 5: Countdown Display */}
        {isCapturing && (
          <div className="countdown-overlay-wrapper" style={{ zIndex: 10 }}>
            <Countdown count={countdown} />
          </div>
        )}

        {/* Flash Effect saat capture */}
        {countdown === 0 && isCapturing && (
          <div className="camera-shutter-flash" style={{ zIndex: 20 }} />
        )}

        {/* Status / Loading / Error Overlay */}
        {cameraStatus === 'CONNECTING' && (
          <div className="camera-state-badge loading" style={{ zIndex: 15 }}>
            <RefreshCw className="animate-spin" size={20} />
            <span>Menghubungkan ke kamera...</span>
          </div>
        )}

        {cameraStatus === 'ERROR' && (
          <div className="camera-error-backdrop" style={{ zIndex: 15 }}>
            <div className="camera-error-box">
              <div className="error-icon-circle">
                <CameraOff size={36} />
              </div>
              <h3>Kamera Tidak Dapat Diakses</h3>
              <p>{cameraErrorMessage || 'Pastikan izin kamera aktif.'}</p>
              <div className="error-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => startCamera(activeDeviceId)}
                >
                  <RefreshCw size={16} /> Coba Lagi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Toolbar Controls */}
      <div className="camera-controls-bar">
        <div className="controls-left">
          <button
            type="button"
            className={`btn-icon ${isMirrored ? 'active' : ''}`}
            onClick={() => setIsMirrored(!isMirrored)}
            title={isMirrored ? 'Cermin Aktif (Flip Horizontal)' : 'Cermin Mati'}
          >
            <FlipHorizontal size={18} />
            <span className="btn-label">{isMirrored ? 'Mirrored' : 'Normal'}</span>
          </button>

          {videoDevices.length > 1 && (
            <div className="camera-device-select-wrapper">
              <Video size={16} className="select-icon" />
              <select
                value={activeDeviceId || ''}
                onChange={handleSwitchCamera}
                className="camera-device-select"
                title="Pilih Perangkat Kamera"
              >
                {videoDevices.map((dev, idx) => (
                  <option key={dev.deviceId || idx} value={dev.deviceId}>
                    {dev.label || `Kamera ${idx + 1}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="controls-right">
          <button
            type="button"
            className="btn-icon"
            onClick={() => startCamera(activeDeviceId)}
            title="Muat Ulang Kamera"
          >
            <RefreshCw size={18} />
            <span className="btn-label">Reset Kamera</span>
          </button>
        </div>
      </div>
    </div>
  );
}
