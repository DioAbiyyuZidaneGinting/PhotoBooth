/**
 * Web Audio API Sound Effects untuk Photobox (Countdown Beep & Shutter Sound)
 * Berjalan murni di browser tanpa file eksternal.
 */

class SoundController {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCountdownBeep(isFinal = false) {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isFinal ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isFinal ? 880 : 523.25, this.ctx.currentTime); // A5 (final) or C5 (countdown)
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (isFinal ? 0.35 : 0.15));

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + (isFinal ? 0.35 : 0.15));
    } catch (e) {
      console.warn('Audio feedback error:', e);
    }
  }

  playShutterSound() {
    try {
      this.init();
      if (!this.ctx) return;

      // Click 1 (Mirror flip up)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.05);

      gain1.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start();
      osc1.stop(this.ctx.currentTime + 0.05);

      // Click 2 (Shutter curtain close)
      setTimeout(() => {
        if (!this.ctx) return;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);

        gain2.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start();
        osc2.stop(this.ctx.currentTime + 0.08);
      }, 70);
    } catch (e) {
      console.warn('Shutter sound error:', e);
    }
  }
}

export const sounds = new SoundController();
