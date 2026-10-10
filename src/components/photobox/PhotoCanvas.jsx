import React, { useRef, useEffect } from 'react';
import { renderPhotoboxComposite } from '../../utils/canvasRenderer';

export default function PhotoCanvas({
  rawPhoto,
  template,
  isMirrored,
  onRenderComplete,
  onError
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!rawPhoto || !template) return;

    let isMounted = true;

    async function processComposite() {
      try {
        const result = await renderPhotoboxComposite(rawPhoto, template, {
          isMirrored,
          zoom: 1.0,
        });

        if (isMounted && onRenderComplete) {
          onRenderComplete(result);
        }
      } catch (err) {
        console.error('Composite render error:', err);
        if (isMounted && onError) {
          onError(err);
        }
      }
    }

    processComposite();

    return () => {
      isMounted = false;
    };
  }, [rawPhoto, template, isMirrored]);

  return (
    <div className="hidden-canvas-container" style={{ display: 'none' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
