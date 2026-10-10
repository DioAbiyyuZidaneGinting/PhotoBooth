/**
 * Perspective Transform & Quadrilateral Mapping Engine for Photobox
 * 
 * Maps source image (with object-fit: cover) into any 4-corner quadrilateral
 * [TL, TR, BR, BL] with zero gaps, no white placeholders, and crisp borders.
 */

/**
 * Solve 2D affine transform matrix mapping (s0, s1, s2) -> (d0, d1, d2)
 */
function solveAffine(s0, s1, s2, d0, d1, d2) {
  const delta = (s0.x - s2.x) * (s1.y - s2.y) - (s1.x - s2.x) * (s0.y - s2.y);
  if (Math.abs(delta) < 1e-7) return null;

  const a = ((d0.x - d2.x) * (s1.y - s2.y) - (d1.x - d2.x) * (s0.y - s2.y)) / delta;
  const b = ((d0.y - d2.y) * (s1.y - s2.y) - (d1.y - d2.y) * (s0.y - s2.y)) / delta;
  const c = ((s0.x - s2.x) * (d1.x - d2.x) - (s1.x - s2.x) * (d0.x - d2.x)) / delta;
  const d = ((s0.x - s2.x) * (d1.y - d2.y) - (s1.x - s2.x) * (d0.y - d2.y)) / delta;
  const e = d0.x - a * s0.x - c * s0.y;
  const f = d0.y - b * s0.x - d * s0.y;

  return { a, b, c, d, e, f };
}

/**
 * Bilinear interpolation on quadrilateral points
 * @param {Array<{x: number, y: number}>} pts - [TL, TR, BR, BL]
 * @param {number} u - 0 to 1
 * @param {number} v - 0 to 1
 */
function interpQuad(pts, u, v) {
  const [p1, p2, p3, p4] = pts;
  const w1 = (1 - u) * (1 - v);
  const w2 = u * (1 - v);
  const w3 = u * v;
  const w4 = (1 - u) * v;

  return {
    x: w1 * p1.x + w2 * p2.x + w3 * p3.x + w4 * p4.x,
    y: w1 * p1.y + w2 * p2.y + w3 * p3.y + w4 * p4.y
  };
}

/**
 * Render an image onto a Canvas context mapped to quadrilateral points
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLImageElement|HTMLCanvasElement} img 
 * @param {Array<{x: number, y: number}>} points - [TL, TR, BR, BL]
 * @param {Object} [options]
 */
export function drawPerspectivePhoto(ctx, img, points, options = {}) {
  if (!points || points.length < 4) return;

  const [p1, p2, p3, p4] = points;

  // 1. Compute dimensions of quadrilateral
  const topW = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  const botW = Math.hypot(p3.x - p4.x, p3.y - p4.y);
  const leftH = Math.hypot(p4.x - p1.x, p4.y - p1.y);
  const rightH = Math.hypot(p3.x - p2.x, p3.y - p2.y);

  const quadW = (topW + botW) / 2;
  const quadH = (leftH + rightH) / 2;

  // Center of quadrilateral
  const cx = (p1.x + p2.x + p3.x + p4.x) / 4;
  const cy = (p1.y + p2.y + p3.y + p4.y) / 4;

  // Rotation angle along top edge
  const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

  // Source image dimensions
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;

  // Object-fit: cover source crop calculation
  const quadAspect = quadW / quadH;
  const imgAspect = imgW / imgH;

  let sx = 0, sy = 0, sw = imgW, sh = imgH;
  if (imgAspect > quadAspect) {
    // Image is wider: crop left & right
    sw = imgH * quadAspect;
    sx = (imgW - sw) / 2;
  } else {
    // Image is taller: crop top & bottom
    sh = imgW / quadAspect;
    sy = (imgH - sh) / 2;
  }

  ctx.save();

  // Clip to EXACT quadrilateral polygon
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.lineTo(p4.x, p4.y);
  ctx.closePath();
  ctx.clip();

  // Check if quadrilateral is approximately a rotated rectangle (within 5% difference)
  const isRotatedRect = Math.abs(topW - botW) / quadW < 0.1 && Math.abs(leftH - rightH) / quadH < 0.1;

  if (isRotatedRect) {
    // Direct rotated rectangle render with 2px bleed for flawless polygon filling
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.drawImage(
      img,
      sx, sy, sw, sh,
      -quadW / 2 - 2, -quadH / 2 - 2, quadW + 4, quadH + 4
    );
  } else {
    // Piecewise mesh transform for perspective/trapezoid distortion
    const subs = options.subdivisions || 8;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = Math.max(1, Math.round(quadW));
    cropCanvas.height = Math.max(1, Math.round(quadH));
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(img, sx, sy, sw, sh, 0, 0, cropCanvas.width, cropCanvas.height);

    const cW = cropCanvas.width;
    const cH = cropCanvas.height;

    for (let i = 0; i < subs; i++) {
      const u0 = i / subs;
      const u1 = (i + 1) / subs;
      const su0 = u0 * cW;
      const su1 = u1 * cW;

      for (let j = 0; j < subs; j++) {
        const v0 = j / subs;
        const v1 = (j + 1) / subs;
        const sv0 = v0 * cH;
        const sv1 = v1 * cH;

        const d00 = interpQuad(points, u0, v0);
        const d10 = interpQuad(points, u1, v0);
        const d11 = interpQuad(points, u1, v1);
        const d01 = interpQuad(points, u0, v1);

        renderTriangle(ctx, cropCanvas, 
          { x: su0, y: sv0 }, { x: su1, y: sv0 }, { x: su0, y: sv1 },
          d00, d10, d01
        );

        renderTriangle(ctx, cropCanvas,
          { x: su1, y: sv0 }, { x: su1, y: sv1 }, { x: su0, y: sv1 },
          d10, d11, d01
        );
      }
    }
  }

  ctx.restore();
}

/**
 * Render single affine-transformed triangle
 */
function renderTriangle(ctx, img, s0, s1, s2, d0, d1, d2) {
  const m = solveAffine(s0, s1, s2, d0, d1, d2);
  if (!m) return;

  ctx.save();

  const cx = (d0.x + d1.x + d2.x) / 3;
  const cy = (d0.y + d1.y + d2.y) / 3;
  const expand = (pt) => ({
    x: pt.x + (pt.x - cx) * 0.04,
    y: pt.y + (pt.y - cy) * 0.04
  });

  const ed0 = expand(d0);
  const ed1 = expand(d1);
  const ed2 = expand(d2);

  ctx.beginPath();
  ctx.moveTo(ed0.x, ed0.y);
  ctx.lineTo(ed1.x, ed1.y);
  ctx.lineTo(ed2.x, ed2.y);
  ctx.closePath();
  ctx.clip();

  ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
  ctx.drawImage(img, 0, 0);

  ctx.restore();
}

/**
 * Helper to compute CSS polygon clip-path string from points in percentage
 * @param {Array<{x: number, y: number}>} points 
 * @param {number} totalW 
 * @param {number} totalH 
 * @returns {string} e.g. "polygon(10% 20%, 50% 22%, 48% 60%, 8% 58%)"
 */
export function getCssPolygonClip(points, totalW, totalH) {
  if (!points || points.length < 4) return 'none';
  return `polygon(${points.map(p => `${((p.x / totalW) * 100).toFixed(2)}% ${((p.y / totalH) * 100).toFixed(2)}%`).join(', ')})`;
}

/**
 * Helper to compute SVG polygon points string from points in percentage
 * @param {Array<{x: number, y: number}>} points 
 * @param {number} totalW 
 * @param {number} totalH 
 * @returns {string}
 */
export function getSvgPolygonPoints(points, totalW, totalH) {
  if (!points || points.length < 4) return '';
  return points.map(p => `${((p.x / totalW) * 100).toFixed(2)},${((p.y / totalH) * 100).toFixed(2)}`).join(' ');
}
