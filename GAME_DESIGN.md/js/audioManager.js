let audioContext = null;
let masterGain = null;
let lowDrone = null;
let pulse = null;

function createOscillator(type, frequency, gainValue) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = gainValue;
  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start();

  return { oscillator, gain };
}

function ensureAudio() {
  if (audioContext) {
    return;
  }

  audioContext = new AudioContext();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioContext.destination);

  lowDrone = createOscillator("sine", 48, 0.28);
  pulse = createOscillator("triangle", 93, 0.045);
}

export function applyAudioSettings(settings) {
  if (!settings.audioEnabled) {
    if (masterGain) {
      masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.08);
    }
    return;
  }

  ensureAudio();

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const safeVolume = Math.max(0, Math.min(1, settings.volume));
  masterGain.gain.setTargetAtTime(safeVolume * 0.22, audioContext.currentTime, 0.12);
  lowDrone.oscillator.frequency.setTargetAtTime(48 + safeVolume * 6, audioContext.currentTime, 0.25);
  pulse.gain.gain.setTargetAtTime(0.025 + safeVolume * 0.035, audioContext.currentTime, 0.25);
}
