/**
 * Utilitas untuk merender gabungan foto kamera multi-slot + overlay frame template ke Canvas
 * Mendukung Multi-Shape Slots: rect, roundedRect, polygon, rotation, dan custom radius
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
 * @param {HTMLVideoElement|HTMLCanvasElement} videoOrCanvasEl
 * @param {boolean} isMirrored
 * @returns {string} Data URL JPEG resolusi optimal
 */
export function captureRawVideo(videoOrCanvasEl, isMirrored = true) {
  if (!videoOrCanvasEl) return '';

  // Jika input sudah merupakan HTMLCanvasElement (canvas hasil komposit background AI)
  if (typeof HTMLCanvasElement !== 'undefined' && videoOrCanvasEl instanceof HTMLCanvasElement) {
    return videoOrCanvasEl.toDataURL('image/jpeg', 0.95);
  }

  const canvas = document.createElement('canvas');
  const videoWidth = videoOrCanvasEl.videoWidth || 1280;
  const videoHeight = videoOrCanvasEl.videoHeight || 720;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.save();
  if (isMirrored) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(videoOrCanvasEl, 0, 0, canvas.width, canvas.height);
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
 * Menggambar path rounded rectangle pada canvas context dengan cross-browser fallback
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @param {number} r 
 */
export function drawRoundRectPath(ctx, x, y, w, h, r) {
  const radius = Math.max(0, Math.min(r || 0, w / 2, h / 2));
  if (radius === 0) {
    ctx.rect(x, y, w, h);
    return;
  }
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.arcTo(x + w, y, x + w, y + radius, radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
    ctx.lineTo(x + radius, y + h);
    ctx.arcTo(x, y + h, x, y + h - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }
}

/**
 * Menggambar gambar ke target rectangle dengan strategi object-fit: cover atau contain
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLImageElement|HTMLCanvasElement} img 
 * @param {number} dx 
 * @param {number} dy 
 * @param {number} dw 
 * @param {number} dh 
 * @param {'cover'|'contain'} fit 
 */
export function drawImageWithFit(ctx, img, dx, dy, dw, dh, fit = 'cover') {
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;
  if (!imgW || !imgH) return;

  const targetAspect = dw / dh;
  const imgAspect = imgW / imgH;

  let sx = 0, sy = 0, sw = imgW, sh = imgH;

  if (fit === 'cover') {
    if (imgAspect > targetAspect) {
      sw = imgH * targetAspect;
      sx = (imgW - sw) / 2;
    } else {
      sh = imgW / targetAspect;
      sy = (imgH - sh) / 2;
    }
    // Sedikit bleed 1px untuk mencegah gap sub-pixel pada batas clipping
    ctx.drawImage(img, sx, sy, sw, sh, dx - 1, dy - 1, dw + 2, dh + 2);
  } else {
    let renderW = dw;
    let renderH = dh;
    let renderX = dx;
    let renderY = dy;
    if (imgAspect > targetAspect) {
      renderH = dw / imgAspect;
      renderY = dy + (dh - renderH) / 2;
    } else {
      renderW = dh * imgAspect;
      renderX = dx + (dw - renderW) / 2;
    }
    ctx.drawImage(img, 0, 0, imgW, imgH, renderX, renderY, renderW, renderH);
  }
}

/**
 * Mengubah slot menjadi 4-corner points jika points belum ada
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
 * Merender foto ke dalam slot dengan bentuk spesifik (rect, roundedRect, polygon)
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLImageElement|HTMLCanvasElement} img 
 * @param {Object} slot 
 */
export function renderSlotPhoto(ctx, img, slot) {
  const points = getSlotPoints(slot);
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const minX = slot.x !== undefined ? slot.x : Math.min(...xs);
  const minY = slot.y !== undefined ? slot.y : Math.min(...ys);
  const w = slot.width !== undefined ? slot.width : Math.max(...xs) - minX;
  const h = slot.height !== undefined ? slot.height : Math.max(...ys) - minY;
  const radius = slot.radius || 0;
  const rotation = slot.rotation || 0;
  const fit = slot.fit || 'cover';
  const shape = slot.shape || (radius > 0 ? 'roundedRect' : (rotation !== 0 ? 'polygon' : 'rect'));

  ctx.save();

  if (shape === 'roundedRect' && radius > 0) {
    // 1. ROUNDED RECTANGLE SLOT (misalnya template luar angkasa)
    ctx.beginPath();
    if (rotation !== 0) {
      const cx = minX + w / 2;
      const cy = minY + h / 2;
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);
      drawRoundRectPath(ctx, -w / 2, -h / 2, w, h, radius);
      ctx.clip();
      drawImageWithFit(ctx, img, -w / 2, -h / 2, w, h, fit);
    } else {
      drawRoundRectPath(ctx, minX, minY, w, h, radius);
      ctx.clip();
      drawImageWithFit(ctx, img, minX, minY, w, h, fit);
    }
  } else if (shape === 'polygon' && points && points.length >= 4) {
    // 2. POLYGON / TILTED QUAD SLOT (misalnya template polaroid miring / The 1975)
    drawPerspectivePhoto(ctx, img, points, { subdivisions: 10 });
  } else {
    // 3. STANDARD RECTANGLE SLOT (misalnya template Case File horizontal & vertical)
    ctx.beginPath();
    if (rotation !== 0) {
      const cx = minX + w / 2;
      const cy = minY + h / 2;
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.rect(-w / 2, -h / 2, w, h);
      ctx.clip();
      drawImageWithFit(ctx, img, -w / 2, -h / 2, w, h, fit);
    } else {
      ctx.rect(minX, minY, w, h);
      ctx.clip();
      drawImageWithFit(ctx, img, minX, minY, w, h, fit);
    }
  }

  ctx.restore();
}

/**
 * Composite Engine Utama Photobox:
 * 1. Base Background Canvas
 * 2. Untuk Opaque Frame: Gambar base template lebih dahulu
 * 3. Gambar semua foto ke slot masing-masing (dengan clipping rect / roundedRect / polygon)
 * 4. Untuk Transparent Frame / Overlay: Gambar frame template di atas foto
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

  // 1. LAYER 1: Background canvas dasar
  ctx.fillStyle = template.backgroundColor || '#ffffff';
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // 2. LAYER 2: Gambar Base Template (jika bukan transparent overlay frame)
  // Untuk frame solid/opak, render dekorasi di bawah foto dan foto menutupi placeholder putih
  const isTransparentFrame = Boolean(template.isTransparentFrame);

  if (template.image && !isTransparentFrame) {
    try {
      const baseImg = await loadImage(template.image);
      ctx.drawImage(baseImg, 0, 0, targetWidth, targetHeight);
    } catch (e) {
      console.warn('Gagal memuat template image dasar:', e);
    }
  }

  // 3. LAYER 3: Render Setiap Foto ke Slot yang Sesuai
  const slots = template.slots && template.slots.length > 0
    ? template.slots
    : [{ id: 'slot-1', x: 0, y: 0, width: targetWidth, height: targetHeight, shape: 'rect' }];

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

  // Gambar foto ke setiap slot yang terisi menggunakan renderSlotPhoto
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const photoSrc = photosMap[slot.id] || photosMap[`slot-${i + 1}`] || photosMap[i];
    if (photoSrc) {
      try {
        const img = await loadImage(photoSrc);
        renderSlotPhoto(ctx, img, slot);
      } catch (e) {
        console.warn(`Gagal merender slot ${slot.id}:`, e);
      }
    }
  }

  // 4. LAYER 4: Render Frame Overlay di atas foto
  // Jika frame transparan, template.image adalah bingkai dekoratif yang diletakkan DI ATAS foto
  // sehingga ornamen, clip, stiker, dan tepi sudut membulat tampil sempurna di atas foto
  const overlaySrc = template.overlayImage || (isTransparentFrame ? template.image : null);
  if (overlaySrc) {
    try {
      const overlayImg = await loadImage(overlaySrc);
      ctx.drawImage(overlayImg, 0, 0, targetWidth, targetHeight);
    } catch (e) {
      console.warn('Gagal merender overlay frame:', e);
    }
  }

  // 5. Output Data URL & Blob
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
