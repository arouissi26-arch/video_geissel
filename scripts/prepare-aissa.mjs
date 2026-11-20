import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const bin = path.dirname(
  require.resolve(
    `@remotion/compositor-${process.platform}-${process.arch}${process.platform === "linux" ? "-gnu" : ""}`,
  ),
);
const probe = process.env.FFPROBE_BIN || path.join(bin, "ffprobe");
const ff = process.env.FFMPEG_BIN || path.join(bin, "ffmpeg");
const directory = "videos_aissa";
if (!fs.existsSync(directory))
  throw new Error(
    "Missing videos_aissa. Retrieve the originals from main before preparing Aissa. See README.",
  );
fs.mkdirSync("public/aissa", { recursive: true });
fs.mkdirSync("public/aissa/thumbs", { recursive: true });
const pieces = ["Aissa_Planxa.mp4.part00", "Aissa_Planxa.mp4.part01"].map((n) =>
  path.join(directory, n),
);
const plank = "public/aissa/planxa.mp4";
const expected = pieces.reduce((n, p) => n + fs.statSync(p).size, 0);
if (!fs.existsSync(plank) || fs.statSync(plank).size !== expected) {
  const out = fs.openSync(plank, "w");
  try {
    for (const part of pieces) fs.writeSync(out, fs.readFileSync(part));
  } finally {
    fs.closeSync(out);
  }
}
// Names follow the actual movements checked in the footage, not misleading filenames.
const sources = [
  ["squat", "Aissa Quads.mp4"],
  ["lunge", "Aissa Sentadilla.mp4"],
  ["bridge", "Aissa pont gluti.mp4"],
  ["lumbar", "Aissa lumbars.mp4"],
  ["abs", "Aissa Abdominals.mp4"],
  ["plank", null],
  ["pullup", "Aissa Dominades 1.mp4"],
  ["pushup", "Aissa Flexions.mp4"],
];
const clips = sources.map(([id, file]) => {
  const src = id === "plank" ? "aissa/planxa.mp4" : `aissa/${id}.mp4`;
  const dest = `public/${src}`;
  if (file) {
    const original = path.join(directory, file);
    if (
      !fs.existsSync(dest) ||
      fs.statSync(dest).size !== fs.statSync(original).size
    ) {
      fs.rmSync(dest, { force: true });
      try {
        fs.linkSync(original, dest);
      } catch {
        fs.copyFileSync(original, dest);
      }
    }
  }
  const streams = JSON.parse(
    execFileSync(probe, ["-v", "error", "-show_streams", "-of", "json", dest], {
      encoding: "utf8",
    }),
  ).streams;
  const v = streams.find((s) => s.codec_type === "video");
  const seconds = Number(v?.duration);
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error(`Unknown video duration: ${dest}`);
  const thumb = `public/aissa/thumbs/${id}.jpg`;
  if (!fs.existsSync(thumb))
    execFileSync(ff, [
      "-y",
      "-loglevel",
      "error",
      "-ss",
      "5",
      "-i",
      dest,
      "-frames:v",
      "1",
      "-vf",
      "scale=480:-2",
      thumb,
    ]);
  return { id, src, seconds, width: v.width, height: v.height };
});
fs.writeFileSync("src/aissa-media.json", JSON.stringify({ clips }, null, 2));
console.log(
  `Aissa: ${clips.length} full recordings, ${clips.reduce((n, c) => n + c.seconds, 0).toFixed(2)} seconds of source video.`,
);
