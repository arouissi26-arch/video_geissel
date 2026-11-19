import React from "react";
import { Grade } from "./Look";
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
import { BLOCK, TOTAL, MovieProps, names, colors, questions } from "../data";
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
        EDUCACIÓ FÍSICA
      </div>
    </AbsoluteFill>
  );
}
export function Ejercicio({
  numero,
  nombre,
  clip,
  colorAccent,
}: {
  numero: number;
  nombre: string;
  clip: string | null;
  colorAccent: string;
}) {
  const f = useCurrentFrame(),
    { width, height } = useVideoConfig(),
    p = 1 - val(f, 0, 15, 0, 1),
    k = pop(f, 3),
    tall = height > width;
  const trans: React.CSSProperties[] = [
    { transform: `translateX(${p * 85}%) skewX(${-p * 12}deg)` },
    { transform: `scale(${1 + p * 1.4})` },
    { transform: `translateY(${-p * 90}%)`, filter: `blur(${p * 14}px)` },
    {
      clipPath: `polygon(0 0,${140 - p * 140}% 0,${100 - p * 140}% 100%,0 100%)`,
    },
    { clipPath: `inset(${p * 50}% 0)` },
    { transform: `rotate(${p * 12}deg) scale(${1 + p * 0.7})` },
    { clipPath: `circle(${(1 - p) * 130}% at 80% 20%)` },
    { transform: `translateX(${-p * 95}%)`, filter: `blur(${p * 20}px)` },
    {
      clipPath: `inset(0 ${p * 100}% 0 0)`,
      transform: `scale(${1 + p * 0.4})`,
    },
  ];
  return (
    <AbsoluteFill style={{ background: colorAccent, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          ...trans[numero - 1],
          background: clip ? "#222" : colorAccent,
        }}
      >
        <Grade id={`moody-${numero}`} />
        {clip ? (
          <OffthreadVideo
            src={asset(clip)}
            muted
            style={{
              height: "100%",
              width: "100%",
              objectFit: tall ? "contain" : "cover",
              filter: `url(#moody-${numero}) contrast(1.05)`,
              transform: `scale(${1 + val(f, 0, BLOCK, 0, 0.045)})`,
            }}
          />
        ) : (
          <AbsoluteFill
            style={{
              background: `repeating-linear-gradient(${35 + f * 0.05}deg,transparent 0 68px,#18181818 68px 74px)`,
              alignItems: "center",
              justifyContent: "center",
              font: `${width * 0.25}px ${display}`,
              color: "#0002",
            }}
          >
            {num(numero)}
          </AbsoluteFill>
        )}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center,transparent 40%,#17101855),linear-gradient(0deg,#141016a6,transparent 60%)",
          }}
        />
        <Dust />
        <div style={{ position: "absolute", top: "7%", left: "5%", ...tag }}>
          EXERCICI {num(numero)} / 09
        </div>
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "5%",
            width: "25%",
            height: 10,
            background: "#ffffff55",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${((numero - 1 + f / BLOCK) / 9) * 100}%`,
              background: colorAccent,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            color: "#fff",
            fontFamily: display,
          }}
        >
          <div
            style={{
              fontSize: width * 0.115,
              lineHeight: 1.1,
              transformOrigin: "left bottom",
              transform: `scale(${0.5 + k * 0.5}) rotate(${(1 - k) * -14}deg)`,
            }}
          >
            {num(numero)}
          </div>
          <div
            style={{
              fontSize: width * (tall ? 0.095 : 0.059),
              background: colorAccent,
              color: "#171619",
              padding: "0 28px 9px",
              textTransform: "uppercase",
              transform: `translateX(${(1 - pop(f, 6)) * -450}px) rotate(-2deg)`,
            }}
          >
            {nombre}
          </div>
          {!clip && <span style={{ ...tag, marginTop: 20 }}>CLIP PENDENT</span>}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{ background: "#fff", opacity: val(f, 0, 4, 0.42, 0) }}
      />
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
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${25 + f * 0.4}% 100%,#8963a9,transparent 60%)`,
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
            maxWidth: "92%",
            font: `${width * 0.059}px/1.12 ${display}`,
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
            font: `bold ${width * 0.044}px "Space Grotesk"`,
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
              opacity: val(f, 93, 98, 0, 0.22) * val(f, 98, 103, 1, 0),
            }}
          />
          <AbsoluteFill
            style={{ background: "black", opacity: val(f, 98, 118, 0, 1) }}
          />
        </>
      )}
    </AbsoluteFill>
  );
}
export function Movie({ clips, answers, audio }: MovieProps) {
  return (
    <AbsoluteFill style={{ background: "#141416" }}>
      <Audio
        src={asset(audio)}
        loop
        volume={(f) => 0.78 * val(f, TOTAL - 65, TOTAL - 1, 1, 0)}
      />
      <Sequence durationInFrames={BLOCK}>
        <Intro />
      </Sequence>
      {names.map((name, i) => (
        <Sequence
          key={name}
          name={name}
          from={(i + 1) * BLOCK}
          durationInFrames={BLOCK}
        >
          <Ejercicio
            numero={i + 1}
            nombre={name}
            clip={clips[i]}
            colorAccent={colors[i + 1]}
          />
        </Sequence>
      ))}
      {questions.map((q, i) => (
        <Sequence
          key={q}
          name={q}
          from={(10 + i) * BLOCK}
          durationInFrames={BLOCK}
        >
          <Outro index={i} answer={answers[i]} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
