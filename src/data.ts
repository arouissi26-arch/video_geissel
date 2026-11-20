import media from "./media.json";
export const names = [
  "Sentadilla",
  "Lunge",
  "Pont de glutis",
  "Lumbars",
  "Sit-up",
  "Planxa",
  "Dominades",
  "Flexions",
  "Burpees",
];
export const questions = [
  "El meu punt fort inicial és:",
  "El moviment que més necessito millorar és:",
  "Objectiu personal per al final del curs:",
];
export const student = "Geissel Canelas";
// Propuesta de autoevaluación; editable antes de entregar.
export const answers = [
  "Em sento més segura en les sentadilles: puc controlar la baixada i tornar a pujar sense perdre l’equilibri.",
  "Vull millorar les dominades, sobretot l’inici de la pujada, sense agafar impuls amb les cames.",
  "A final de curs vull fer una dominada completa i controlada. Gravaré el moviment per comparar-lo amb el d’avui.",
];
export const FPS = 30,
  INTRO = 4 * FPS,
  TEASER = 75,
  CARD = 8 * FPS;
export const colors = [
  "#bfa5ed",
  "#e5ec68",
  "#ff9777",
  "#adc6e4",
  "#c1a9eb",
  "#d9e87c",
  "#fac38f",
  "#b9a2df",
  "#ffc09f",
  "#d8e878",
  "#b79ddd",
];
export const clock = (f: number) =>
  `${String(Math.floor(f / 1800)).padStart(2, "0")}:${String(Math.floor(f / 30) % 60).padStart(2, "0")}`;
export const defaults = { clips: media.clips, audio: media.audio, answers };
export type MovieProps = typeof defaults;
export function timeline(clips: MovieProps["clips"]) {
  const previews = clips.map((c, i) => ({
    ...c,
    name: names[c.slot - 1],
    from: INTRO + i * TEASER,
    frames: TEASER,
  }));
  let pos = INTRO + previews.length * TEASER;
  const exercises = clips.map((c) => {
    const from = pos,
      frames = Math.ceil(c.seconds * FPS);
    pos += frames;
    return { ...c, name: names[c.slot - 1], from, frames };
  });
  const scenes = [
    { name: "Introducció", from: 0, frames: INTRO, color: colors[0] },
    ...previews.map((e) => ({
      ...e,
      name: `Avanç · ${e.name}`,
      color: colors[e.slot],
    })),
    ...exercises.map((e) => ({ ...e, color: colors[e.slot] })),
    {
      name: "Reflexió final",
      from: pos,
      frames: questions.length * CARD,
      color: colors[10],
    },
  ];
  return {
    previews,
    exercises,
    scenes,
    outro: pos,
    total: pos + questions.length * CARD,
  };
}
