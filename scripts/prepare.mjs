import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ff =
  process.env.FFMPEG_BIN ||
  (() => {
    try {
      return path.join(
        path.dirname(
          require.resolve(
            `@remotion/compositor-${process.platform}-${process.arch}${process.platform === "linux" ? "-gnu" : ""}`,
          ),
        ),
        process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
      );
    } catch {
      return "ffmpeg";
    }
  })();
const originals = [
  "Squats 4",
  "lunges 1",
  "pont de glutis 2",
  null,
  "abdominals nivel 3",
  null,
  "dominadas.1",
  "Flexcions 3",
  null,
];
fs.mkdirSync("public/fallback", { recursive: true });
fs.mkdirSync("public/thumbs", { recursive: true });
const ffprobe =
  process.env.FFPROBE_BIN || ff.replace(/ffmpeg(?=(\.exe)?$)/, "ffprobe");
const clips = originals.flatMap((name, i) => {
  const uploaded = `clips/exercici-${i + 1}.mp4`,
    original = `videos/${name}.mp4`;
  let src = uploaded;
  if (!fs.existsSync(`public/${src}`)) {
    if (!name || !fs.existsSync(original)) return [];
    src = `fallback/original-${i + 1}.mp4`;
    const dest = `public/${src}`;
    if (
      !fs.existsSync(dest) ||
      fs.statSync(original).mtimeMs > fs.statSync(dest).mtimeMs ||
      fs.statSync(original).size !== fs.statSync(dest).size
    ) {
      fs.rmSync(dest, { force: true });
      try {
        fs.linkSync(original, dest);
      } catch {
        fs.copyFileSync(original, dest);
      }
    }
  }
  const duration = Number(
    execFileSync(
      ffprobe,
      [
        "-v",
        "error",
        "-select_streams",
        "v:0",
        "-show_entries",
        "stream=duration",
        "-of",
        "csv=p=0",
        `public/${src}`,
      ],
      { encoding: "utf8" },
    )
      .trim()
      .split(",")[0],
  );
  if (!Number.isFinite(duration) || duration <= 0)
    throw new Error(`Duración de vídeo desconocida: ${src}`);
  const thumb = `public/thumbs/${i + 1}.jpg`;
  if (
    !fs.existsSync(thumb) ||
    fs.statSync(thumb).mtimeMs < fs.statSync(`public/${src}`).mtimeMs
  )
    execFileSync(ff, [
      "-y",
      "-loglevel",
      "error",
      "-i",
      `public/${src}`,
      "-frames:v",
      "1",
      "-vf",
      "scale=240:-2",
      thumb,
    ]);
  return [{ slot: i + 1, src, seconds: duration }];
});
const audio = ["music.mp3", "music.wav", "music.m4a", "pulse.mp3"].find((x) =>
  fs.existsSync(path.join("public/audio", x)),
);
fs.writeFileSync(
  "src/media.json",
  JSON.stringify({ clips, audio: `audio/${audio}` }, null, 2),
);
