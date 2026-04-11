"use client";

// Synthesized tones via Web Audio API — no MP3 files needed.
// Each sound ID maps to a simple tone config.

type WaveType = "sine" | "square" | "sawtooth" | "triangle";

interface ToneConfig {
  frequency: number;
  duration: number;
  type: WaveType;
  gain?: number;
  detune?: number;
}

const TONES: Record<string, ToneConfig[]> = {
  click: [{ frequency: 440, duration: 0.08, type: "square", gain: 0.15 }],
  "points-common": [
    { frequency: 523, duration: 0.1, type: "sine", gain: 0.2 },
    { frequency: 659, duration: 0.15, type: "sine", gain: 0.2 },
  ],
  "points-uncommon": [
    { frequency: 523, duration: 0.08, type: "sine", gain: 0.25 },
    { frequency: 659, duration: 0.08, type: "sine", gain: 0.25 },
    { frequency: 784, duration: 0.18, type: "sine", gain: 0.25 },
  ],
  "points-rare": [
    { frequency: 440, duration: 0.08, type: "sine", gain: 0.3 },
    { frequency: 554, duration: 0.08, type: "sine", gain: 0.3 },
    { frequency: 659, duration: 0.08, type: "sine", gain: 0.3 },
    { frequency: 880, duration: 0.25, type: "sine", gain: 0.3 },
  ],
  legendary: [
    { frequency: 330, duration: 0.1, type: "sawtooth", gain: 0.2 },
    { frequency: 392, duration: 0.1, type: "sawtooth", gain: 0.2 },
    { frequency: 523, duration: 0.1, type: "sawtooth", gain: 0.2 },
    { frequency: 659, duration: 0.1, type: "sawtooth", gain: 0.2 },
    { frequency: 784, duration: 0.3, type: "sawtooth", gain: 0.2 },
    { frequency: 1047, duration: 0.4, type: "sine", gain: 0.25 },
  ],
  achievement: [
    { frequency: 523, duration: 0.08, type: "sine", gain: 0.3 },
    { frequency: 659, duration: 0.08, type: "sine", gain: 0.3 },
    { frequency: 784, duration: 0.08, type: "sine", gain: 0.3 },
    { frequency: 1047, duration: 0.35, type: "sine", gain: 0.3 },
  ],
  unlock: [
    { frequency: 440, duration: 0.06, type: "sine", gain: 0.25 },
    { frequency: 880, duration: 0.18, type: "sine", gain: 0.2 },
  ],
  vote: [{ frequency: 300, duration: 0.1, type: "triangle", gain: 0.2 }],
  streak: [
    { frequency: 392, duration: 0.08, type: "sine", gain: 0.25 },
    { frequency: 494, duration: 0.08, type: "sine", gain: 0.25 },
    { frequency: 587, duration: 0.08, type: "sine", gain: 0.25 },
    { frequency: 784, duration: 0.2, type: "sine", gain: 0.25 },
  ],
};

class SoundManager {
  private ctx: AudioContext | null = null;
  private muted = false;

  private getCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    }
    return this.ctx;
  }

  private playTone(config: ToneConfig, startTime: number): void {
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = config.type;
    osc.frequency.value = config.frequency;
    if (config.detune) osc.detune.value = config.detune;
    const g = config.gain ?? 0.2;
    gain.gain.setValueAtTime(g, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + config.duration);
    osc.start(startTime);
    osc.stop(startTime + config.duration + 0.01);
  }

  play(soundId: string): void {
    if (this.muted) return;
    const ctx = this.getCtx();
    if (!ctx) return;

    // Resume context if suspended (autoplay policy)
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const tones = TONES[soundId];
    if (!tones) return;

    let delay = 0;
    for (const tone of tones) {
      this.playTone(tone, ctx.currentTime + delay);
      delay += tone.duration * 0.7; // slight overlap for smoother sequences
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
  }

  isMuted(): boolean {
    return this.muted;
  }
}

export const soundManager = new SoundManager();
