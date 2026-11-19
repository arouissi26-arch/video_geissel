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
export const answers = ["[Resposta]", "[Resposta]", "[Resposta]"];
export const FPS = 30,
  BLOCK = 120,
  TOTAL = BLOCK * 13;
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
export const scenes = ["Introducció", ...names, "Reflexió final"];
export const active = (f: number) => Math.min(10, Math.floor(f / BLOCK));
export const clock = (f: number) =>
  `${String(Math.floor(f / 1800)).padStart(2, "0")}:${String(Math.floor(f / 30) % 60).padStart(2, "0")}`;
export const defaults = {
  clips: media.clips as (string | null)[],
  audio: media.audio,
  answers,
};
export type MovieProps = typeof defaults;
