import media from "./aissa-media.json";
export const AFPS = 30;
export const AINTRO = 180;
export const APREVIEW = 75;
export const ABRIDGE = 60;
export const ACARD = 180;
export const AEND = 90;
export const details: Record<
  string,
  {
    name: string;
    category: string;
    cue: string;
    short: string;
    accent: string;
    previewAt: number;
  }
> = {
  squat: {
    name: "Sentadilles",
    category: "TREN INFERIOR",
    cue: "Baixada controlada · peus estables",
    short: "CONTROL",
    accent: "#ff6b35",
    previewAt: 7,
  },
  lunge: {
    name: "Gambades",
    category: "TREN INFERIOR",
    cue: "Equilibri · control de cada pas",
    short: "EQUILIBRI",
    accent: "#6cd9ff",
    previewAt: 3,
  },
  bridge: {
    name: "Pont de glutis",
    category: "CADENA POSTERIOR",
    cue: "Extensió de maluc · suport estable",
    short: "EXTENSIÓ",
    accent: "#ff6b35",
    previewAt: 12,
  },
  lumbar: {
    name: "Lumbars",
    category: "CADENA POSTERIOR",
    cue: "Moviment suau · control del tronc",
    short: "ESTABILITAT",
    accent: "#6cd9ff",
    previewAt: 8,
  },
  abs: {
    name: "Abdominals",
    category: "CORE",
    cue: "Flexió del tronc · ritme controlat",
    short: "PRECISIÓ",
    accent: "#ff6b35",
    previewAt: 8,
  },
  plank: {
    name: "Planxa",
    category: "CORE",
    cue: "Alineació corporal · respiració contínua",
    short: "RESISTÈNCIA",
    accent: "#6cd9ff",
    previewAt: 8,
  },
  pullup: {
    name: "Dominades",
    category: "TREN SUPERIOR",
    cue: "Tracció vertical · control del balanceig",
    short: "TRACCIÓ",
    accent: "#ff6b35",
    previewAt: 5,
  },
  pushup: {
    name: "Flexions",
    category: "TREN SUPERIOR · SUPORT ELEVAT",
    cue: "Mans sobre suport · cos alineat",
    short: "IMPULS",
    accent: "#6cd9ff",
    previewAt: 6,
  },
};
export const aissaClips = media.clips.map((c) => ({ ...c, ...details[c.id] }));
export type AissaClip = (typeof aissaClips)[number];
export const atime = (frames: number) =>
  `${String(Math.floor(frames / AFPS / 60)).padStart(2, "0")}:${String(Math.floor(frames / AFPS) % 60).padStart(2, "0")}`;
export function aissaTimeline() {
  const previews = aissaClips.map((c, i) => ({
    ...c,
    from: AINTRO + i * APREVIEW,
    frames: APREVIEW,
  }));
  const bridge = AINTRO + previews.length * APREVIEW;
  let pos = bridge + ABRIDGE;
  const exercises = aissaClips.map((c) => {
    const frames = Math.ceil(c.seconds * AFPS);
    const e = { ...c, from: pos, frames };
    pos += frames;
    return e;
  });
  const outro = pos;
  const end = outro + 3 * ACARD;
  return {
    previews,
    exercises,
    bridge,
    outro,
    end,
    total: end + AEND,
    scenes: [
      { name: "Manifest", from: 0, frames: AINTRO },
      ...previews.map((c) => ({
        name: `Avanç / ${c.name}`,
        from: c.from,
        frames: c.frames,
      })),
      { name: "Registre complet", from: bridge, frames: ABRIDGE },
      ...exercises.map((c) => ({
        name: c.name,
        from: c.from,
        frames: c.frames,
      })),
      { name: "Reflexió i continuïtat", from: outro, frames: 3 * ACARD },
      { name: "Aissa / End", from: end, frames: AEND },
    ],
  };
}
