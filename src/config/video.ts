import manifestJson from '../generated/asset-manifest.json';

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;
export const INTRO_FRAMES = 120; // 4.0 seconds
export const EXERCISE_FRAMES = 120; // 8 beats at 120 BPM
export const OUTRO_FRAMES = 240; // 8.0 seconds
export const DURATION_IN_FRAMES = INTRO_FRAMES + 9 * EXERCISE_FRAMES + OUTRO_FRAMES;
export const MUSIC_BPM = 120;

export type TransitionStyle =
  | 'zoom-blast'
  | 'diagonal-wipe'
  | 'whip-pan'
  | 'shutter'
  | 'glitch'
  | 'circle-burst'
  | 'slide-up'
  | 'split-reveal'
  | 'scanline';

type AssetManifest = {
  clips: Array<{filename: string; path: string; available: boolean}>;
  audio: string;
};
const assetManifest = manifestJson as AssetManifest;

const clipFor = (numero: number) => {
  const filename = `exercici-${numero}.mp4`;
  const asset = assetManifest.clips.find((candidate) => candidate.filename === filename);
  return {clip: asset?.path ?? `clips/${filename}`, clipAvailable: asset?.available ?? false};
};

export type ExerciseData = {
  numero: number;
  nombre: string;
  clip: string;
  clipAvailable: boolean;
  colorAccent: string;
  transition: TransitionStyle;
  tag: string;
};

const rawExercises: Array<Omit<ExerciseData, 'clip' | 'clipAvailable'>> = [
  {numero: 1, nombre: 'Sentadilla', colorAccent: '#D8FF45', transition: 'zoom-blast', tag: 'CONTROL · POTENCIA'},
  {numero: 2, nombre: 'Lunge', colorAccent: '#FF704B', transition: 'diagonal-wipe', tag: 'ESTABILIDAD · RANGO'},
  {numero: 3, nombre: 'Pont de glutis', colorAccent: '#67F3D0', transition: 'whip-pan', tag: 'CADENA POSTERIOR'},
  {numero: 4, nombre: 'Lumbars', colorAccent: '#B6A0FF', transition: 'shutter', tag: 'EXTENSIÓN · CONTROL'},
  {numero: 5, nombre: 'Sit-up', colorAccent: '#FFC45B', transition: 'glitch', tag: 'CORE · RESISTENCIA'},
  {numero: 6, nombre: 'Planxa', colorAccent: '#8B83FF', transition: 'circle-burst', tag: 'CORE · ISOMETRÍA'},
  {numero: 7, nombre: 'Dominades', colorAccent: '#67DFFF', transition: 'slide-up', tag: 'FORÇA · TRACCIÓ'},
  {numero: 8, nombre: 'Flexions', colorAccent: '#D8FF45', transition: 'split-reveal', tag: 'FORÇA · EMPENTA'},
  {numero: 9, nombre: 'Burpees', colorAccent: '#FF704B', transition: 'scanline', tag: 'POTÈNCIA · GLOBAL'}
];

export const exercises: ExerciseData[] = rawExercises.map((exercise) => ({
  ...exercise,
  ...clipFor(exercise.numero)
}));

export const AUDIO_PATH = assetManifest.audio || 'audio/demo-bed.wav';

export const SKILL_EFFECTS_USED = [
  'spotlight', 'backdrop-word', 'dot-reveal', 'led-sign', 'moody', 'timeline',
  'countdown-flip', 'locked-on', 'lean-in', 'uninstall', 'rabbit-hole', 'scribble',
  'glass-widgets', 'liquid-glass-graph', 'checklist', 'tape-label', 'huge-strike', 'slow-push'
] as const;
