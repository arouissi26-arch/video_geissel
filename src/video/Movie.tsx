import React from "react";

import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  random,
  Easing,
} from "remotion";
import "@fontsource/anton/latin-400.css";
import {
  INTRO,
  TEASER,
  CARD,
  student,
  timeline,
  MovieProps,
  colors,
  questions,
} from "../data";
const mono = '"Courier New", monospace',
  lime = "#e2fb44",
  display = "Anton, sans-serif";
export const asset = (p: string) => (p.startsWith("blob:") ? p : staticFile(p));
const val = (f: number, a: number, b: number, x: number, y: number) =>
  interpolate(f, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
const pop = (f: number, d = 0) =>
  spring({
    fps: 30,
    frame: Math.max(0, f - d),
    config: { damping: 13, stiffness: 155, mass: 0.8 },
  });
const num = (n: number) => String(n).padStart(2, "0");
function Dust({ dark = false }: { dark?: boolean }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: 54 }, (_, i) => (
        <i
          key={i}
          style={{
            position: "absolute",
            width: i % 6 === 0 ? 8 : 3,
            height: i % 6 === 0 ? 8 : 3,
            background: dark ? "#111" : "#fff",
            opacity: 0.22,
            left: `${(random(i) * 100 + f * 0.035) % 100}%`,
            top: `${(random("y" + i) * 100 + f * 0.015) % 100}%`,
            transform: `rotate(${f + i}deg)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
}
const tag: React.CSSProperties = {
  display: "inline-block",
  background: "#1a191b",
  color: "#fff",
  fontFamily: mono,
  fontWeight: "bold",
  letterSpacing: 4,
  padding: "12px 20px",
  fontSize: 25,
};
export function Intro() {
  const f = useCurrentFrame(),
    { width, height } = useVideoConfig(),
    tall = height > width;
  const k = pop(f);
  const split = f < 18 || f > 98 ? Math.sin(f * 1.7) * 13 : 0;
  return (
    <AbsoluteFill style={{ background: "#ac88ce", overflow: "hidden" }}>
      <Img
        src={staticFile("art/runner.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: tall ? "62% center" : "center",
          transform: `scale(${1.02 + val(f, 0, 120, 0, 0.065)})`,
        }}
      />
      <Dust dark />
      <div style={{ position: "absolute", top: "7%", left: "5.2%", ...tag }}>
        ↗ &nbsp;FORÇA / VOL. 01
      </div>
      <div
        style={{
          position: "absolute",
          right: "4%",
          top: "7%",
          font: "bold 32px monospace",
          color: "#fff",
        }}
      >
        ＋
      </div>
      <div
        style={{
          position: "absolute",
          top: tall ? "32%" : "25%",
          left: "5%",
          fontFamily: display,
          fontSize: width * (tall ? 0.175 : 0.105),
          letterSpacing: -width * 0.0025,
          lineHeight: 1.03,
          transform: `translateX(${(1 - k) * -100}px) rotate(-2deg)`,
        }}
      >
        {["AVALUACIÓ", "INICIAL"].map((word, i) => (
          <div
            key={word}
            style={{ position: "relative", color: i ? "#fffdf3" : "#161418" }}
          >
            {split !== 0 &&
              ["#ff344d", "#00eefa"].map((c, j) => (
                <span
                  key={c}
                  style={{
                    position: "absolute",
                    inset: 0,
                    color: c,
                    mixBlendMode: "screen",
                    transform: `translateX(${split * (j ? -1 : 1)}px)`,
                  }}
                >
                  {word}
                </span>
              ))}
            <span style={{ position: "relative" }}>{word}</span>
          </div>
        ))}
        <div
          style={{
            marginTop: 28,
            background: lime,
            color: "#151518",
            font: 'bold 52px "Space Grotesk", sans-serif',
            letterSpacing: -2,
            width: "fit-content",
            padding: "3px 24px 8px",
            transform: `rotate(-3deg) scale(${0.85 + 0.15 * pop(f, 6)})`,
          }}
        >
          {"Punt de partida".split("").map((l, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
                transform: `translateY(${(1 - pop(f, 5 + i)) * 15}px)`,
                opacity: val(f, 4 + i, 10 + i, 0.2, 1),
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <svg
        viewBox="0 0 140 140"
        style={{
          position: "absolute",
          right: "6%",
          bottom: "7%",
          width: "8%",
          transform: `rotate(${-13 + Math.sin(f / 22) * 9}deg) scale(${0.93 + 0.07 * pop(f, 9)})`,
        }}
        aria-hidden
      >
        <path
          fill={lime}
          stroke="#181719"
          strokeWidth="3"
          d={
            Array.from({ length: 32 }, (_, i) => {
              const a = (i * Math.PI) / 16,
                r = i % 2 ? 51 : 66;
              return `${i ? "L" : "M"}${70 + Math.cos(a) * r},${70 + Math.sin(a) * r}`;
            }).join(" ") + "Z"
          }
        />
        <path
          d="M45 85 60 54h10L55 85zm17 0 15-31h10L72 85zm17 0 15-31h8L88 85z"
          fill="#19171b"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: "5.2%",
          right: "5.2%",
          bottom: "6%",
          display: "flex",
          alignItems: "center",
          gap: 20,
          font: `bold 23px ${mono}`,
          letterSpacing: 3,
        }}
      >
        <span
          style={{
            width: 100,
            height: 28,
            background:
              "repeating-linear-gradient(90deg,#19161c 0 4px,transparent 4px 9px,#19161c 9px 11px,transparent 11px 16px)",
          }}
        />{" "}
        {student} · EDUCACIÓ FÍSICA
      </div>
    </AbsoluteFill>
  );
}
// AI artwork is clearly labelled and kept separate from the real assessment.
export function Preview({
  slot,
  name,
  clip,
  numero,
}: {
  slot: number;
  name: string;
  clip: string;
  numero: number;
}) {
  const f = useCurrentFrame();
  const accent = colors[slot];
  return (
    <AbsoluteFill
      style={{ background: "#19171e", overflow: "hidden", color: "white" }}
    >
      <Img
        src={staticFile(`art/exercise-${slot}.jpg`)}
        style={{
          position: "absolute",
          width: "44%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${1.03 + f * 0.0008}) translateX(${(1 - pop(f)) * -30}px)`,
        }}
      />
      <OffthreadVideo
        src={asset(clip)}
        startFrom={Math.round(3 * 30)}
        muted
        style={{
          position: "absolute",
          right: 0,
          top: "9%",
          width: "56%",
          height: "74%",
          objectFit: "contain",
          transform: `translateX(${(1 - pop(f, 3)) * 90}px)`,
        }}
      />
      <Dust />
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "4%",
          ...tag,
          color: accent,
        }}
      >
        AVANÇ / {num(numero)}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "23%",
          left: "3%",
          font: `bold 16px ${mono}`,
          background: "#19171bcc",
          padding: 10,
        }}
      >
        IMATGE IA · IL·LUSTRACIÓ
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "20%",
          background: accent,
          color: "#19171e",
          display: "flex",
          alignItems: "center",
          padding: "0 4%",
          gap: 35,
          transform: `translateY(${(1 - pop(f, 5)) * 120}px)`,
        }}
      >
        <span style={{ font: `100px ${display}` }}>{num(numero)}</span>
        <span style={{ font: `78px ${display}`, textTransform: "uppercase" }}>
          {name}
        </span>
        <span style={{ marginLeft: "auto", font: `bold 20px ${mono}` }}>
          GEISSEL CANELAS
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 7,
          width: `${(100 * (f + 1)) / TEASER}%`,
          background: "#19171e",
        }}
      />
    </AbsoluteFill>
  );
}
// The title animates in its own band; not one frame of the recording is
// hidden by a transition, an overlay, a zoom or a crop.
export function Ejercicio({
  numero,
  nombre,
  clip,
  colorAccent,
  count,
  frames,
}: {
  numero: number;
  nombre: string;
  clip: string;
  colorAccent: string;
  count: number;
  frames: number;
}) {
  const f = useCurrentFrame(),
    { width, height } = useVideoConfig(),
    tall = height > width;
  return (
    <AbsoluteFill style={{ background: "#19191b" }}>
      <OffthreadVideo
        src={asset(clip)}
        volume={0.85}
        style={{ width: "100%", height: "91.5%", objectFit: "contain" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          height: "8.5%",
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 4%",
          gap: 28,
          color: "white",
          fontFamily: display,
        }}
      >
        <span
          style={{
            fontSize: tall ? 55 : 40,
            background: colorAccent,
            color: "#171518",
            padding: "0 13px",
            transform: `scale(${0.8 + 0.2 * pop(f)}) rotate(-3deg)`,
          }}
        >
          {num(numero)}
        </span>
        <span
          style={{
            fontSize: tall ? 54 : 40,
            textTransform: "uppercase",
            transform: `translateX(${(1 - pop(f)) * 45}px)`,
          }}
        >
          {nombre}
        </span>
        <span
          style={{
            marginLeft: "auto",
            font: `bold ${width * 0.014}px ${mono}`,
            letterSpacing: 2,
          }}
        >
          FORÇA / {num(numero)} DE {num(count)}
        </span>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 4,
            width: `${(100 * (f + 1)) / frames}%`,
            background: colorAccent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
export function Outro({ index, answer }: { index: number; answer: string }) {
  const f = useCurrentFrame(),
    { width } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ background: "#222028", overflow: "hidden", color: "#fff" }}
    >
      <Img
        src={staticFile(`art/${["stance", "grip", "runner"][index]}.jpg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "65% center",
          transform: `scale(${1 + val(f, 0, CARD, 0, 0.04)})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg,#19141fee 12%,#19141fdf 49%,#19141f12 100%)",
        }}
      />
      <Dust />
      <div
        style={{
          position: "absolute",
          font: `${width * 0.36}px ${display}`,
          right: "-2%",
          top: "-7%",
          color: "#ffffff0a",
          transform: `translateX(${-f * 0.35}px)`,
        }}
      >
        0{index + 1}
      </div>
      <div style={{ position: "absolute", inset: "8% 7%" }}>
        <span style={{ ...tag, color: lime }}>REFLEXIÓ / 0{index + 1}</span>
        <div
          style={{
            marginTop: 65,
            maxWidth: "75%",
            font: `${width * 0.048}px/1.12 ${display}`,
            textTransform: "uppercase",
          }}
        >
          {questions[index].split(" ").map((w, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: 20,
                opacity: val(f, i * 2, i * 2 + 6, 0, 1),
                transform: `translateY(${(1 - pop(f, i * 2)) * 60}px)`,
              }}
            >
              {w}
            </span>
          ))}
        </div>
        <p
          style={{
            maxWidth: "70%",
            lineHeight: 1.2,
            font: `bold ${width * 0.032}px "Space Grotesk"`,
            color: lime,
            opacity: val(f, 19, 32, 0, 1),
          }}
        >
          {answer}
        </p>
      </div>
      {index === 2 && (
        <>
          <AbsoluteFill
            style={{
              background: "#faf1ff",
              opacity:
                val(f, CARD - 27, CARD - 22, 0, 0.22) *
                val(f, CARD - 22, CARD - 17, 1, 0),
            }}
          />
          <AbsoluteFill
            style={{
              background: "black",
              opacity: val(f, CARD - 22, CARD - 2, 0, 1),
            }}
          />
        </>
      )}
    </AbsoluteFill>
  );
}
export function Movie({ clips, answers, audio }: MovieProps) {
  const { previews, exercises, outro, total } = timeline(clips);
  return (
    <AbsoluteFill style={{ background: "#141416" }}>
      <Audio
        src={asset(audio)}
        loop
        loopVolumeCurveBehavior="extend"
        volume={(f) =>
          (f >= INTRO && f < outro ? 0.14 : 0.6) *
          val(f, total - 65, total - 1, 1, 0)
        }
      />
      <Sequence durationInFrames={INTRO}>
        <Intro />
      </Sequence>
      {previews.map((e, i) => (
        <Sequence
          key={`preview-${e.slot}`}
          name={`Avanç · ${e.name}`}
          from={e.from}
          durationInFrames={TEASER}
        >
          <Preview slot={e.slot} name={e.name} clip={e.src} numero={i + 1} />
        </Sequence>
      ))}
      {exercises.map((e, i) => (
        <Sequence
          key={e.slot}
          name={e.name}
          from={e.from}
          durationInFrames={e.frames}
        >
          <Ejercicio
            numero={i + 1}
            nombre={e.name}
            clip={e.src}
            frames={e.frames}
            count={exercises.length}
            colorAccent={colors[e.slot]}
          />
        </Sequence>
      ))}
      {questions.map((q, i) => (
        <Sequence
          key={q}
          name={q}
          from={outro + i * CARD}
          durationInFrames={CARD}
        >
          <Outro index={i} answer={answers[i]} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
