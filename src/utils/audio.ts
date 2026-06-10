class AudioManager {
  private ctx: AudioContext | null = null;
  private musicNode: OscillatorNode | null = null;
  private musicGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private noiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private isEnabled: boolean = false;

  constructor() {}

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.isEnabled = true;
      this.startDrone();
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  }

  public setEnabled(val: boolean) {
    this.isEnabled = val;
    if (val) {
      this.init();
      if (this.ctx?.state === "suspended") {
        this.ctx.resume();
      }
      this.unmute();
    } else {
      this.mute();
    }
  }

  private unmute() {
    if (this.droneGain) this.droneGain.gain.setTargetAtTime(0.3, this.ctx!.currentTime, 1);
    if (this.musicGain) this.musicGain.gain.setTargetAtTime(0.15, this.ctx!.currentTime, 1);
  }

  private mute() {
    if (this.droneGain) this.droneGain.gain.setTargetAtTime(0, this.ctx!.currentTime, 0.1);
    if (this.musicGain) this.musicGain.gain.setTargetAtTime(0, this.ctx!.currentTime, 0.1);
  }

  private startDrone() {
    if (!this.ctx) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0.3;
    this.droneGain.connect(this.ctx.destination);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = "sine";
    this.droneOsc1.frequency.value = 55;
    
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = "sawtooth";
    this.droneOsc2.frequency.value = 82.4;

    const lpf = this.ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 150;
    lpf.Q.value = 3;

    this.droneOsc1.connect(lpf);
    this.droneOsc2.connect(lpf);
    lpf.connect(this.droneGain);

    this.droneOsc1.start();
    this.droneOsc2.start();

    try {
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut * 0.98 + white * 0.02);
        lastOut = output[i];
        output[i] *= 1.5;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = "bandpass";
      rainFilter.frequency.value = 400;
      rainFilter.Q.value = 1;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.value = 0.1;

      noiseSource.connect(rainFilter);
      rainFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noiseSource.start();
    } catch (e) {
      console.warn("Failed to create rain/wind noise:", e);
    }

    this.scheduleAtmosphericMusic();
  }

  private scheduleAtmosphericMusic() {
    if (!this.ctx || !this.isEnabled) return;

    const notes = [164.8, 196.0, 220.0, 246.9, 293.7, 329.6];
    const playNext = () => {
      if (!this.isEnabled) {
        setTimeout(playNext, 4000);
        return;
      }

      const note = notes[Math.floor(Math.random() * notes.length)];
      this.playPluck(note, 3.5, 0.1);

      const nextDelay = 4000 + Math.random() * 4000;
      setTimeout(playNext, nextDelay);
    };

    setTimeout(playNext, 2000);
  }

  private playPluck(freq: number, duration: number = 2, vol: number = 0.1) {
    if (!this.ctx || !this.isEnabled) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.value = freq;

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(freq * 3, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  public playStep() {
    if (!this.ctx || !this.isEnabled) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    filter.type = "lowpass";
    filter.frequency.value = 80;

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.16);
  }

  public playDialogueBeep(voiceType: "child" | "mother" | "pharmacist" | "sister") {
    if (!this.ctx || !this.isEnabled) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    let freq = 150;
    osc.type = "sine";

    if (voiceType === "child") {
      freq = 280 + Math.random() * 30;
      osc.type = "triangle";
    } else if (voiceType === "mother") {
      freq = 220 + Math.random() * 20;
    } else if (voiceType === "pharmacist") {
      freq = 110 + Math.random() * 15;
      osc.type = "sawtooth";
    } else if (voiceType === "sister") {
      freq = 250 + Math.random() * 25;
      osc.type = "triangle";
    }

    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.linearRampToValueAtTime(freq * 0.9, now + 0.04);

    const bpf = this.ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.value = freq;
    bpf.Q.value = 2;

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(bpf);
    bpf.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.05);
  }

  public playDoorTransition() {
    if (!this.ctx || !this.isEnabled) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(50, now + 0.4);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.5);
  }

  public playQuestSuccess() {
    if (!this.ctx || !this.isEnabled) return;
    const now = this.ctx.currentTime;

    const notes = [261.6, 329.6, 392.0, 523.3];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }

  public playDreadChord() {
    if (!this.ctx || !this.isEnabled) return;
    const now = this.ctx.currentTime;

    const freqs = [73.42, 110.0, 146.8, 174.6, 220.0, 277.18];
    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.value = freq;

      filter.type = "lowpass";
      filter.frequency.value = freq * 1.5;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 4.2);
    });
  }
}

export const audio = new AudioManager();