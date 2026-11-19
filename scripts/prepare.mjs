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
const clips = originals.map((name, i) => {
  const uploaded = `clips/exercici-${i + 1}.mp4`,
    fallback = `fallback/${i + 1}.mp4`;
  let src = null;
  if (fs.existsSync(`public/${uploaded}`)) src = uploaded;
  else if (name && fs.existsSync(`videos/${name}.mp4`)) {
    if (!fs.existsSync(`public/${fallback}`))
      execFileSync(ff, [
        "-loglevel",
        "error",
        "-ss",
        "1",
        "-i",
        `videos/${name}.mp4`,
        "-t",
        "4",
        "-an",
        "-r",
        "30",
        "-c:v",
        "libx264",
        "-threads",
        "3",
        "-preset",
        "veryfast",
        "-crf",
        "22",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        `public/${fallback}`,
      ]);
    src = fallback;
  }
  if (src) {
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
  }
  return src;
});
const audio = ["music.mp3", "music.wav", "music.m4a", "pulse.mp3"].find((x) =>
  fs.existsSync(path.join("public/audio", x)),
);
fs.writeFileSync(
  "src/media.json",
  JSON.stringify({ clips, audio: `audio/${audio}` }, null, 2),
);
