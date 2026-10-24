/**
 * Web Audio API synthesizer for Lo-Fi Cafe ambient music & rain soundscape
 * Plays warm rhodes chords and relaxing rain noise without external assets
 */

class LoFiSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private rainNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.isPlaying = true;

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      // Start gentle rain generator
      this.startRain();

      // Start rhythmic 78 BPM lofi chord progression
      this.startChords();
    } catch {
      this.isPlaying = false;
    }
  }

  private startRain() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink noise generation for rain
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    rainSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.gainNode);

    rainSource.start();
    this.rainNode = rainSource;
  }

  private playTone(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, time);

    env.gain.setValueAtTime(0.001, time);
    env.gain.exponentialRampToValueAtTime(0.08, time + 0.04);
    env.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(env);
    env.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  private startChords() {
    if (!this.ctx) return;
    // 78 BPM = ~0.77 sec per beat, 4 beats per bar = ~3.08 sec
    // Progression: Fmaj7 (F3, A3, C4, E4), Em7 (E3, G3, B3, D4), Dm7 (D3, F3, A3, C4), Cmaj7 (C3, E3, G3, B3)
    const chords = [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [164.81, 196.0, 246.94, 293.66], // Em7
      [146.83, 174.61, 220.0, 261.63], // Dm7
      [130.81, 164.81, 196.0, 246.94], // Cmaj7
    ];

    let chordIdx = 0;
    const beatInterval = (60 / 78) * 4 * 1000;

    const triggerNext = () => {
      if (!this.isPlaying || !this.ctx) return;
      const notes = chords[chordIdx % chords.length];
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        this.playTone(freq, now + idx * 0.04, 2.8);
      });
      chordIdx++;
    };

    triggerNext();
    this.timer = window.setInterval(triggerNext, beatInterval);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.rainNode) {
      try {
        (this.rainNode as AudioBufferSourceNode).stop();
      } catch {
        // ignore
      }
      this.rainNode = null;
    }
  }
}

export const lofiAudio = new LoFiSynth();
