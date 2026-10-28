import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, CameraOff, RefreshCw, FlipHorizontal, AlertCircle, Sparkles, Video, Aperture, Check, Image as ImageIcon } from 'lucide-react';
import Countdown from './Countdown';
import { PHOTO_BACKGROUNDS, getBackgroundById } from '../../data/backgrounds';
import { segmentationManager } from '../../services/selfieSegmentationService';

/**
 * Menggambar gambar latar dengan cover fit agar tidak distorsi
 */
function drawCoverImage(ctx, img, x, y, w, h) {
  if (!img) return;
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;
  if (!imgW || !imgH) return;

  const targetAspect = w / h;
  const imgAspect = imgW / imgH;

  let sx = 0, sy = 0, sw = imgW, sh = imgH;
  if (imgAspect > targetAspect) {
    sw = imgH * targetAspect;
    sx = (imgW - sw) / 2;
  } else {
    sh = imgW / targetAspect;
    sy = (imgH - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

export default function CameraPreview({
  selectedTemplate,
  photoCount = null,
  currentSlotIndex = 0,
  cameraStatus,
  setCameraStatus,
  countdown,
  isCapturing,
  videoRef,
  captureCanvasRef,
  isMirrored,
  setIsMirrored,
  onStartCapture,
  cameraErrorMessage,
  setCameraErrorMessage,
  activeDeviceId,
  setActiveDeviceId,
  activeBackgroundId = 'design1',
  setActiveBackgroundId = null,
  debugMode = false
}) {
  const [videoDevices, setVideoDevices] = useState([]);
  const streamRef = useRef(null);

  // Canvas untuk rendering realtime komposit AI
  const localCanvasRef = useRef(null);
  const canvasRef = captureCanvasRef || localCanvasRef;

  // Status MediaPipe AI Segmentation
  const [aiStatus, setAiStatus] = useState('INIT'); // 'INIT' | 'READY' | 'PROCESSING' | 'ERROR'
  const [aiErrorMessage, setAiErrorMessage] = useState('');

  // Cache gambar background
  const bgImagesCache = useRef({});

  const maxSlots = selectedTemplate?.slots?.length || 1;
  const totalSlots = photoCount ? Math.min(photoCount, maxSlots) : maxSlots;

  // Preload background images
  useEffect(() => {
    PHOTO_BACKGROUNDS.forEach((bg) => {
      if (bg.image && !bgImagesCache.current[bg.id]) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = bg.image;
        img.onload = () => {
          bgImagesCache.current[bg.id] = img;
        };
      }
    });
  }, []);

  // Inisialisasi MediaPipe Selfie Segmentation
  useEffect(() => {
    let isMounted = true;

    async function initMediaPipe() {
      try {
        setAiStatus('INIT');
        await segmentationManager.init();
        if (isMounted) {
          setAiStatus('READY');
        }
      } catch (err) {
        console.error('Gagal inisialisasi MediaPipe Selfie Segmentation:', err);
        if (isMounted) {
          setAiStatus('ERROR');
          setAiErrorMessage('Gagal memuat AI Segmentation. Menggunakan kamera normal.');
        }
      }
    }

    initMediaPipe();

    return () => {
      isMounted = false;
    };
  }, []);

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
          ? { deviceId: { exact: deviceIdToUse }, width: { ideal: 1280 }, height: { ideal: 720 } }
          : { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
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

  // Loop Render Realtime Komposit: Latar Belakang (Layer 1) + Orang Tersegmentasi (Layer 2)
  useEffect(() => {
    let animId = null;
    let isProcessing = false;

    const renderLoop = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState >= 2 && cameraStatus === 'READY') {
        const vWidth = video.videoWidth || 1280;
        const vHeight = video.videoHeight || 720;

        if (canvas.width !== vWidth || canvas.height !== vHeight) {
          canvas.width = vWidth;
          canvas.height = vHeight;
        }

        const ctx = canvas.getContext('2d');

        // Jika user memilih background dan MediaPipe aktif
        const isAiActive = activeBackgroundId !== 'none' && segmentationManager.isReady;

        if (isAiActive && !isProcessing) {
          isProcessing = true;

          // Pasang handler hasil segmentasi
          segmentationManager.setOnResults((results) => {
            if (!ctx) return;

            ctx.save();
            ctx.clearRect(0, 0, vWidth, vHeight);

            // Terapkan mirror
            if (isMirrored) {
              ctx.translate(vWidth, 0);
              ctx.scale(-1, 1);
            }

            const currentBgImg = bgImagesCache.current[activeBackgroundId];

            if (currentBgImg && results.segmentationMask) {
              // 1. Gambar mask segmentasi orang
              ctx.drawImage(results.segmentationMask, 0, 0, vWidth, vHeight);

              // 2. 'source-in' memotong gambar kamera sehingga HANYA orang yang tampil
              // Latar asli ruangan, jendela terang, dan dinding otomatis hilang (100% transparan)!
              ctx.globalCompositeOperation = 'source-in';
              ctx.drawImage(results.image, 0, 0, vWidth, vHeight);

              // 3. 'destination-over' menaruh gambar background pilihan di BELAKANG orang
              ctx.globalCompositeOperation = 'destination-over';
              drawCoverImage(ctx, currentBgImg, 0, 0, vWidth, vHeight);
            } else {
              // Fallback jika gambar background belum siap
              ctx.drawImage(results.image, 0, 0, vWidth, vHeight);
            }

            ctx.restore();
            isProcessing = false;
          });

          await segmentationManager.send(video);
        } else if (!isAiActive) {
          // Render kamera normal jika 'none' dipilih atau AI belum siap
          ctx.save();
          ctx.clearRect(0, 0, vWidth, vHeight);
          if (isMirrored) {
            ctx.translate(vWidth, 0);
            ctx.scale(-1, 1);
          }
          ctx.drawImage(video, 0, 0, vWidth, vHeight);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [activeBackgroundId, cameraStatus, isMirrored]);

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
            ({selectedTemplate?.slots?.[currentSlotIndex]?.label || `Slot ${currentSlotIndex + 1}`})
          </span>
        </div>
        <div className="banner-right">
          {aiStatus === 'READY' && activeBackgroundId !== 'none' && (
            <span className="banner-ai-pill" title="AI Background Aktif">
              <Sparkles size={13} className="text-pink" />
              <span>AI BG Active</span>
            </span>
          )}
          {cameraStatus === 'READY' && (
            <span className="banner-live-pill">
              <span className="pulse-dot" /> LIVE
            </span>
          )}
        </div>
      </div>

      {/* Aspect Ratio Box Wrapper */}
      <div
        className="aspect-ratio-wrapper"
        style={{
          aspectRatio: '4 / 3',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          backgroundColor: '#0a0a0f'
        }}
      >
        {/* Hidden HTML Video element untuk stream mentah kamera */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: 'none'
          }}
        />

        {/* Live Canvas Viewfinder — Menampilkan komposit AI secara langsung */}
        <canvas
          ref={canvasRef}
          className="camera-video-feed"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />

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

      {/* ========================================================
          PANEL PILIHAN BACKGROUND FOTO (AI VIRTUAL BACKGROUND)
          Dari folder template/background foto/
         ======================================================== */}
      <div className="bg-selector-panel">
        <div className="bg-selector-header">
          <div className="bg-selector-title-group">
            <ImageIcon size={15} className="text-pink" />
            <span className="bg-selector-title">Ganti Background Foto:</span>
          </div>
          <span className="bg-selector-hint">
            Latar asli &amp; cahaya jendela otomatis diganti dengan AI
          </span>
        </div>

        <div className="bg-thumbnails-row">
          {PHOTO_BACKGROUNDS.map((bg) => {
            const isSelected = activeBackgroundId === bg.id;
            return (
              <button
                key={bg.id}
                type="button"
                className={`bg-thumb-btn ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  if (setActiveBackgroundId) {
                    setActiveBackgroundId(bg.id);
                  }
                }}
                disabled={isCapturing}
                title={bg.description}
              >
                <div className="bg-thumb-preview">
                  {bg.image ? (
                    <img
                      src={bg.image}
                      alt={bg.name}
                      className="bg-thumb-img"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="bg-thumb-none">
                      <CameraOff size={16} />
                    </div>
                  )}

                  {isSelected && (
                    <div className="bg-thumb-selected-badge">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span className="bg-thumb-name">{bg.name}</span>
              </button>
            );
          })}
        </div>
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
