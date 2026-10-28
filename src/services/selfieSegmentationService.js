import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

class SegmentationManager {
  constructor() {
    this.segmenter = null;
    this.isReady = false;
    this.isLoading = false;
    this.error = null;
    this.onResultsCallback = null;
    this.initPromise = null;
  }

  async init() {
    if (this.segmenter && this.isReady) return this.segmenter;
    if (this.initPromise) return this.initPromise;

    this.isLoading = true;
    this.error = null;

    this.initPromise = (async () => {
      // 1. Coba memuat lokal dari /mediapipe/
      try {
        const segmenter = new SelfieSegmentation({
          locateFile: (file) => `/mediapipe/${file}`
        });

        segmenter.setOptions({
          modelSelection: 1, // 1 for landscape / high accuracy
          selfieMode: false
        });

        segmenter.onResults((results) => {
          if (this.onResultsCallback) {
            this.onResultsCallback(results);
          }
        });

        await segmenter.initialize();
        this.segmenter = segmenter;
        this.isReady = true;
        this.isLoading = false;
        return segmenter;
      } catch (localErr) {
        console.warn('Gagal memuat MediaPipe lokal, mencoba CDN fallback...', localErr);
        // 2. Fallback ke CDN jsdelivr
        try {
          const segmenter = new SelfieSegmentation({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
          });

          segmenter.setOptions({
            modelSelection: 1,
            selfieMode: false
          });

          segmenter.onResults((results) => {
            if (this.onResultsCallback) {
              this.onResultsCallback(results);
            }
          });

          await segmenter.initialize();
          this.segmenter = segmenter;
          this.isReady = true;
          this.isLoading = false;
          return segmenter;
        } catch (cdnErr) {
          console.error('Inisialisasi MediaPipe gagal total:', cdnErr);
          this.error = cdnErr;
          this.isLoading = false;
          throw cdnErr;
        }
      }
    })();

    return this.initPromise;
  }

  setOnResults(cb) {
    this.onResultsCallback = cb;
  }

  async send(videoElement) {
    if (!this.segmenter || !this.isReady) return;
    try {
      await this.segmenter.send({ image: videoElement });
    } catch (e) {
      // Abaikan frame drop saat performa sibuk
    }
  }

  close() {
    if (this.segmenter) {
      try {
        this.segmenter.close();
      } catch (e) {}
      this.segmenter = null;
      this.isReady = false;
      this.initPromise = null;
    }
  }
}

export const segmentationManager = new SegmentationManager();
