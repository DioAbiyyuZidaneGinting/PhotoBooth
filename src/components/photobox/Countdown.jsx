import React from 'react';
import { Camera } from 'lucide-react';

export default function Countdown({ count }) {
  if (count === null || count === undefined) return null;

  const isCapture = count === 0;

  return (
    <div className="countdown-container">
      <div className={`countdown-number ${isCapture ? 'is-capture' : ''}`}>
        {isCapture ? (
          <div className="countdown-capture-text">
            <Camera size={48} className="capture-icon" />
            <span>SMILE!</span>
          </div>
        ) : (
          <span className="count-digit">{count}</span>
        )}
      </div>
      <div className="countdown-ring"></div>
    </div>
  );
}
