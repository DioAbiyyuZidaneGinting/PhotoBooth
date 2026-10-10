import React from 'react';

/** Hand-drawn brush underline */
export function BrushUnderline({ color = '#E8431F', width = 220, height = 14, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`brush-underline-svg ${className}`}
      aria-hidden="true"
    >
      <path
        d="M3 8.5C45.2 3.8 112 2.2 217 7.8C185 11.2 120 13 40 10.5C22 9.9 8 9.1 3 8.5Z"
        fill={color}
      />
    </svg>
  );
}

/** Zig-zag brush stroke */
export function ZigzagUnderline({ color = '#F2B71F', width = 180, height = 16, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`zigzag-svg ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 11L18 4L34 12L50 4L66 12L82 4L98 12L114 4L130 12L146 4L162 12L178 5"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Retro 4-point Sparkle Star */
export function RetroSpark({ size = 28, color = '#E8431F', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`retro-spark-svg ${className}`}
      aria-hidden="true"
    >
      <path d="M12 0C12.5 6.5 17.5 11.5 24 12C17.5 12.5 12.5 17.5 12 24C11.5 17.5 6.5 12.5 0 12C6.5 11.5 11.5 6.5 12 0Z" />
    </svg>
  );
}

/** Camera / Lens Doodle with Flash Rays */
export function CameraDoodle({ size = 52, color = '#E8431F', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`camera-doodle-svg ${className}`}
      aria-hidden="true"
    >
      {/* Flash rays */}
      <path d="M12 12L6 6M20 6L20 1M6 20L1 20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Body */}
      <rect x="8" y="18" width="48" height="36" rx="8" stroke={color} strokeWidth="3.5" fill="none" />
      {/* Lens */}
      <circle cx="32" cy="36" r="11" stroke={color} strokeWidth="3.5" fill="none" />
      <circle cx="32" cy="36" r="4.5" fill={color} />
      {/* Top shutter box */}
      <path d="M22 18V13H36V18" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      {/* Mini viewfinder */}
      <rect x="44" y="24" width="6" height="5" rx="1.5" fill={color} />
    </svg>
  );
}

/** Crown Doodle */
export function CrownDoodle({ size = 36, color = '#F2B71F', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`crown-doodle-svg ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4 27L8 11L18 20L28 11L32 27H4Z"
        fill={color}
        stroke="#111111"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="2.5" fill="#111111" />
      <circle cx="18" cy="15" r="2.5" fill="#111111" />
      <circle cx="28" cy="8" r="2.5" fill="#111111" />
    </svg>
  );
}

/** OK Hand / Peace Gesture Doodle */
export function HandOkDoodle({ size = 48, color = '#111111', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`hand-doodle-svg ${className}`}
      aria-hidden="true"
    >
      <path
        d="M20 18C20 14.7 22.7 12 26 12C29.3 12 32 14.7 32 18V28C32 33 28 37 23 37C18 37 14 33 14 28V24"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M26 18C26 21 23 24 20 24C17 24 14 21 14 18C14 15 17 12 20 12C23 12 26 15 26 18Z"
        stroke={color}
        strokeWidth="3"
      />
      <path d="M32 20C32 18 33.8 16 36 16C38.2 16 40 18 40 20V29" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M26 37L22 43" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Dot Grid Graphic */
export function DotGrid({ rows = 4, cols = 6, color = '#111111', gap = 14, size = 3, className = '' }) {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={c * gap + size}
          cy={r * gap + size}
          r={size / 2}
          fill={color}
        />
      );
    }
  }
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      viewBox={`0 0 ${cols * gap} ${rows * gap}`}
      className={`dot-grid-svg ${className}`}
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

/** Rotating Circular Stamp / Sticker with textPath */
export function RotatingStamp({
  text = 'MOMENTS • FRAMES • MEMORIES •',
  size = 110,
  bg = '#F2B71F',
  textColor = '#111111',
  centerIcon = '✦',
  className = ''
}) {
  const id = React.useId().replace(/:/g, '');
  const pathId = `circle-path-${id}`;
  const r = 38;
  const center = size / 2;

  return (
    <div
      className={`rotating-stamp-container ${className}`}
      style={{ width: size, height: size }}
      title={text}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotating-stamp-svg"
      >
        {/* Background circle */}
        <circle cx={center} cy={center} r={center - 3} fill={bg} stroke={textColor} strokeWidth="2.5" />
        
        {/* Dashed inner circle */}
        <circle cx={center} cy={center} r={center - 8} fill="none" stroke={textColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Circular text path */}
        <path
          id={pathId}
          d={`M ${center},${center} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          fill="none"
        />

        <text fill={textColor} fontSize="8.5" fontWeight="900" letterSpacing="2.2">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>

        {/* Center icon */}
        <text
          x={center}
          y={center + 5}
          fill={textColor}
          fontSize="18"
          fontWeight="bold"
          textAnchor="middle"
        >
          {centerIcon}
        </text>
      </svg>
    </div>
  );
}

/** Irregular Painted Splotch / Organic Color Block */
export function PaintSplotch({ color = '#F2B71F', width = 380, height = 340, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`paint-splotch-svg ${className}`}
      aria-hidden="true"
    >
      <path
        d="M25 65C60 15 140 5 220 18C300 31 365 75 372 145C379 215 340 285 270 315C200 345 110 330 55 285C0 240 -10 115 25 65Z"
        fill={color}
      />
    </svg>
  );
}
