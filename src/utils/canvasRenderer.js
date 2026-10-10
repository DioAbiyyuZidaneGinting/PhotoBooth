/**
 * Utilitas untuk merender gabungan foto kamera multi-slot + overlay frame template ke Canvas
 * Menggunakan Four-Corner Quadrilateral & Perspective Transformation
 */
import { drawPerspectivePhoto } from './perspectiveTransform';

/**
 * Memuat gambar dari URL/data URL ke objek HTMLImageElement
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) {
      return reject(new Error('URL gambar kosong'));
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error(`Gagal memuat gambar: ${src}`));
    img.src = src;
  });
}

/**
 * Mengambil snapshot raw dari elemen video kamera
 * @param {HTMLVideoElement} videoEl
 * @param {boolean} isMirrored
 * @returns {string} Data URL JPEG resolusi optimal
 */
export function captureRawVideo(videoEl, isMirrored = true) {
  const canvas = document.createElement('canvas');
  const videoWidth = videoEl.videoWidth || 1280;
  const videoHeight = videoEl.videoHeight || 720;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.save();
  if (isMirrored) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.95);
}

/**
 * Kompresi gambar dataURL untuk pengiriman realtime P2P / upload cepat
 * @param {string} dataUrl
 * @param {number} maxWidth
 * @param {number} quality
 * @returns {Promise<string>}
 */
export async function compressImageDataUrl(dataUrl, maxWidth = 1000, quality = 0.85) {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  let width = img.width;
  let height = img.height;

  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', quality);
}

/**
 * Mengubah slot lama (x, y, width, height, rotation) menjadi 4-corner points jika points belum ada
 * @param {Object} slot 
 * @returns {Array<{x: number, y: number}>} [TL, TR, BR, BL]
 */
export function getSlotPoints(slot) {
  if (slot.points && Array.isArray(slot.points) && slot.points.length >= 4) {
    return slot.points;
  }

  const x = slot.x || 0;
  const y = slot.y || 0;
  const w = slot.width || 300;
  const h = slot.height || 300;
  const rot = (slot.rotation || 0) * (Math.PI / 180);

  if (rot === 0) {
    return [
      { x, y },
      { x: x + w, y },
      { x: x + w, y: y + h },
      { x, y: y + h }
    ];
  }

  const cx = x + w / 2;
  const cy = y + h / 2;
  const rotatePt = (px, py) => {
    const dx = px - cx;
    const dy = py - cy;
    return {
      x: Math.round(cx + dx * Math.cos(rot) - dy * Math.sin(rot)),
      y: Math.round(cy + dx * Math.sin(rot) + dy * Math.cos(rot))
    };
  };

  return [
    rotatePt(x, y),
    rotatePt(x + w, y),
    rotatePt(x + w, y + h),
    rotatePt(x, y + h)
  ];
}

/**
 * Composite Engine Utama Photobox:
 * 1. Base Background Canvas
 * 2. Perspective Render Captured Photos into Each Slot's 4 Corners
 * 3. Mask Frame PNG (punch out slot areas without destroying ornaments)
 * 4. Draw Masked Frame Overlay on top of Photos
 * 
 * @param {Object|Array|string} photos - Map { [slotId]: dataUrl } atau single photo
 * @param {Object} template - Template object dengan width, height, slots, image
 * @param {Object} [options]
 * @returns {Promise<{ canvas: HTMLCanvasElement, dataUrl: string, blob: Blob, width: number, height: number }>}
 */
export async function renderPhotoboxComposite(photos, template, options = {}) {
  const targetWidth = template.width || 1024;
  const targetHeight = template.height || 1536;

  // Canvas Utama
  const mainCanvas = document.createElement('canvas');
  mainCanvas.width = targetWidth;
  mainCanvas.height = targetHeight;
  const ctx = mainCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. LAYER 1: Background canvas
  ctx.fillStyle = template.backgroundColor || '#ffffff';
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // 2. LAYER 2: Normalisasi dan Render Setiap Foto ke Slot
  const slots = template.slots && template.slots.length > 0
    ? template.slots
    : [{ id: 'slot-1', points: [{ x: 0, y: 0 }, { x: targetWidth, y: 0 }, { x: targetWidth, y: targetHeight }, { x: 0, y: targetHeight }] }];

  const photosMap = {};
  if (typeof photos === 'string') {
    photosMap[slots[0]?.id || 'slot-1'] = photos;
  } else if (Array.isArray(photos)) {
    photos.forEach((p, idx) => {
      const slotId = slots[idx]?.id || `slot-${idx + 1}`;
      photosMap[slotId] = p;
    });
  } else if (typeof photos === 'object' && photos !== null) {
    Object.assign(photosMap, photos);
  }

  // Gambar foto ke setiap slot menggunakan perspective transform
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const photoSrc = photosMap[slot.id] || photosMap[i];
    if (photoSrc) {
      try {
        const img = await loadImage(photoSrc);
        const points = getSlotPoints(slot);
        drawPerspectivePhoto(ctx, img, points, { subdivisions: 10 });
      } catch (e) {
        console.warn(`Gagal merender slot ${slot.id}:`, e);
      }
    }
  }

  // 3. LAYER 3: Render Masked Frame Overlay
  if (template.image) {
    try {
      const frameImg = await loadImage(template.image);
      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = targetWidth;
      frameCanvas.height = targetHeight;
      const frameCtx = frameCanvas.getContext('2d');
      frameCtx.imageSmoothingEnabled = true;
      frameCtx.imageSmoothingQuality = 'high';

      // Gambar frame asli
      frameCtx.drawImage(frameImg, 0, 0, targetWidth, targetHeight);

      // Punch out (lubangi) area photo slot pada frame PNG
      // Gunakan polygon points setiap slot agar area foto terbuka,
      // tapi seluruh desain, stiker, teks, dan frame ornamen tetap utuh!
      frameCtx.globalCompositeOperation = 'destination-out';
      slots.forEach(slot => {
        const points = getSlotPoints(slot);
        if (points && points.length >= 4) {
          frameCtx.beginPath();
          frameCtx.moveTo(points[0].x, points[0].y);
          for (let p = 1; p < points.length; p++) {
            frameCtx.lineTo(points[p].x, points[p].y);
          }
          frameCtx.closePath();
          frameCtx.fill();
        }
      });

      // Kembalikan ke mode normal & render frame berlubang ke canvas utama
      frameCtx.globalCompositeOperation = 'source-over';
      ctx.drawImage(frameCanvas, 0, 0);
    } catch (e) {
      console.warn('Gagal memproses frame overlay:', e);
    }
  }

  // 4. Output Data URL & Blob
  const dataUrl = mainCanvas.toDataURL('image/png', 1.0);
  const blob = await new Promise((resolve) => {
    mainCanvas.toBlob((b) => resolve(b), 'image/png', 1.0);
  });

  return {
    canvas: mainCanvas,
    dataUrl,
    blob,
    width: targetWidth,
    height: targetHeight
  };
}

/**
 * Menghasilkan nama file timestamp
 */
export function generateFilename(extension = 'png') {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `photobox-${year}-${month}-${day}-${hours}-${minutes}-${seconds}.${extension}`;
}
