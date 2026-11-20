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
  random,
} from "remotion";
import "@fontsource/anton/latin-400.css";
import "@fontsource/space-grotesk/latin-700.css";
import {
  AINTRO,
  APREVIEW,
  ABRIDGE,
  ACARD,
  AEND,
  AissaClip,
  aissaTimeline,
  atime,
} from "../aissa-data";
const C = {
  ink: "#080f20",
  blue: "#164bff",
  ice: "#edf4fa",
  orange: "#ff6b35",
  muted: "#8c9db6",
};
const face = "Anton, sans-serif",
  sans = '"Space Grotesk", sans-serif',
  mono = '"Courier New", monospace';
const pad = (n: number) => String(n).padStart(2, "0");
const lerp = (f: number, a: number, b: number, x: number, y: number) =>
  interpolate(f, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
const enter = (f: number, delay = 0) =>
  spring({
    frame: Math.max(0, f - delay),
    fps: 30,
    config: { damping: 20, stiffness: 110, mass: 0.8 },
  });
const art = (id: string) => staticFile(`art/aissa/${id}.jpg`);
const label: React.CSSProperties = {
  font: `bold 22px ${mono}`,
  letterSpacing: 3,
};
function Signal({ quiet = false }: { quiet?: boolean }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        overflow: "hidden",
        opacity: quiet ? 0.15 : 0.6,
      }}
    >
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {Array.from({ length: 19 }, (_, i) => (
          <line
            key={i}
            x1={i * 120}
            x2={i * 120}
            y1="0"
            y2="1080"
            stroke="#7ba5ff"
            strokeOpacity=".10"
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            x2="1920"
            y1={i * 120}
            y2={i * 120}
            stroke="#7ba5ff"
            strokeOpacity=".10"
          />
        ))}
        <path
          d={`M${-500 + f * 6} 1080 l720 -1080 h190 l-720 1080z`}
          fill="#fff"
          opacity=".035"
        />
      </svg>
      {Array.from({ length: 28 }, (_, i) => (
        <i
          key={i}
          style={{
            position: "absolute",
            left: `${(random(i) * 100 + f * 0.018) % 100}%`,
            top: `${random("ap" + i) * 100}%`,
            width: i % 5 === 0 ? 6 : 2,
            height: i % 5 === 0 ? 6 : 2,
            background: i % 3 ? C.ice : C.orange,
            opacity: 0.35,
            transform: `rotate(${45 + f * 0.2}deg)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
}
function Corners({ color = C.ice }: { color?: string }) {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {[
        [42, 42, 0],
        [1840, 42, 90],
        [1840, 998, 180],
        [42, 998, 270],
      ].map(([x, y, r], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 38,
            height: 38,
            borderLeft: `2px solid ${color}`,
            borderTop: `2px solid ${color}`,
            transform: `rotate(${r}deg)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
}
function RevealText({
  children,
  delay = 0,
  size = 180,
  color = C.ice,
}: {
  children: string;
  delay?: number;
  size?: number;
  color?: string;
}) {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        overflow: "hidden",
        font: `${size}px/.98 ${face}`,
        letterSpacing: -2,
        color,
        paddingBottom: 12,
      }}
    >
      <div style={{ transform: `translateY(${(1 - enter(f, delay)) * 125}%)` }}>
        {children}
      </div>
    </div>
  );
}
export function AissaIntro() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ background: C.ink, color: C.ice, overflow: "hidden" }}
    >
      <Img
        src={art("hero")}
        style={{
          position: "absolute",
          right: 0,
          width: "66%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${1.08 - lerp(f, 0, AINTRO, 0, 0.06)})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg,#080f20 2%,#080f20f5 28%,#080f2080 60%,transparent 100%)",
        }}
      />
      <Signal />
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 86,
          ...label,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: C.orange,
            boxShadow: `0 0 ${12 + Math.sin(f * 0.1) * 8}px ${C.orange}`,
          }}
        />
        ARXIU DE MOVIMENT <span style={{ color: C.muted }}>/ 001</span>
      </div>
      <div style={{ position: "absolute", left: 82, top: 228 }}>
        <RevealText delay={4} size={220}>
          AISSA.
        </RevealText>
        <div
          style={{
            height: 9,
            width: lerp(f, 10, 40, 0, 540),
            background: C.orange,
            margin: "18px 0 32px",
          }}
        />
        <RevealText delay={17} size={112}>
          AVALUACIÓ
        </RevealText>
        <RevealText delay={24} size={112} color="#78d9ff">
          INICIAL.
        </RevealText>
        <p
          style={{
            font: `24px ${sans}`,
            letterSpacing: 7,
            marginTop: 36,
            opacity: lerp(f, 36, 52, 0, 1),
          }}
        >
          FORÇA. CONTROL. EVOLUCIÓ.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          right: 92,
          top: 94,
          width: 192,
          height: 192,
          border: "1px solid #edf4fa66",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotate(${-20 + f * 0.18}deg)`,
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path
            d="M15 75 75 15M24 15h51v51"
            stroke={C.orange}
            strokeWidth="9"
            fill="none"
          />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 86,
          right: 86,
          bottom: 74,
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #edf4fa55",
          paddingTop: 24,
          ...label,
        }}
      >
        <span>08 MOVIMENTS / 01 PUNT DE PARTIDA</span>
        <span>EDUCACIÓ FÍSICA ↗</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 90,
          bottom: 142,
          font: `14px ${mono}`,
          letterSpacing: 2,
          opacity: 0.7,
        }}
      >
        FOTOGRAFIA IA · IMATGE CONCEPTUAL
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: C.blue,
          transform: `translateX(${lerp(f, AINTRO - 12, AINTRO, 110, -110)}%) skewX(-12deg)`,
        }}
      />
    </AbsoluteFill>
  );
}
export function AissaPreview({
  clip,
  index,
}: {
  clip: AissaClip;
  index: number;
}) {
  const f = useCurrentFrame();
  const wipe = lerp(f, 15, 31, 100, 0);
  return (
    <AbsoluteFill
      style={{ background: C.ink, color: C.ice, overflow: "hidden" }}
    >
      <Img
        src={art(clip.id)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${1.03 + f * 0.0008})`,
          opacity: lerp(f, 18, 34, 1, 0.46),
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg,#080f20ee 0%,#080f2080 45%,transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "39%",
          right: 70,
          top: 154,
          height: 645,
          overflow: "hidden",
          clipPath: `inset(0 0 0 ${wipe}%)`,
          borderBottom: `4px solid ${clip.accent}`,
          boxShadow: "0 30px 70px #0009",
        }}
      >
        <OffthreadVideo
          src={staticFile(clip.src)}
          startFrom={Math.round(clip.previewAt * 30)}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: C.ink,
          }}
        />
      </div>
      <Signal quiet />
      <div
        style={{
          position: "absolute",
          left: 86,
          top: 70,
          ...label,
          color: clip.accent,
        }}
      >
        MOVEMENT STUDY <span style={{ color: C.ice }}>/ {pad(index + 1)}</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 86,
          top: 194,
          font: `230px/.95 ${face}`,
          color: "transparent",
          WebkitTextStroke: "2px #edf4fa88",
          transform: `translateX(${(1 - enter(f)) * -90}px)`,
        }}
      >
        {pad(index + 1)}
      </div>
      <div style={{ position: "absolute", left: 90, top: 458, width: 570 }}>
        <div
          style={{
            ...label,
            color: clip.accent,
            marginBottom: 20,
            fontSize: 17,
          }}
        >
          {clip.category}
        </div>
        <RevealText size={clip.name.length > 12 ? 76 : 90} delay={3}>
          {clip.name.toUpperCase()}
        </RevealText>
        <div
          style={{
            marginTop: 25,
            font: `20px/1.5 ${sans}`,
            maxWidth: 430,
            opacity: lerp(f, 13, 28, 0, 1),
          }}
        >
          {clip.cue}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 86,
          right: 86,
          bottom: 78,
          borderTop: "1px solid #edf4fa66",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          ...label,
        }}
      >
        <span>{clip.short} ↗</span>
        <span style={{ color: C.muted, fontSize: 16 }}>
          FOTO IA / VÍDEO REAL · AISSA
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 7,
          width: `${(100 * (f + 1)) / APREVIEW}%`,
          background: clip.accent,
        }}
      />
    </AbsoluteFill>
  );
}
function AissaBridge() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: C.blue,
        color: C.ice,
        overflow: "hidden",
        padding: "120px 88px",
      }}
    >
      <Signal />
      <div style={{ ...label, color: "#ffffff99" }}>
        02 / REGISTRE D’AVALUACIÓ
      </div>
      <div style={{ marginTop: 90 }}>
        <RevealText size={142}>ARA, EL MOVIMENT.</RevealText>
        <RevealText delay={6} size={142}>
          SENSE TALLS.
        </RevealText>
      </div>
      <div
        style={{
          marginTop: 55,
          font: `30px ${sans}`,
          opacity: lerp(f, 12, 23, 0, 1),
        }}
      >
        8 gravacions íntegres. Una base real per veure el progrés.
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 90,
          right: 90,
          display: "flex",
          gap: 16,
        }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            style={{
              height: 6,
              flex: 1,
              background: f > i * 5 ? C.orange : "#ffffff44",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}
export function AissaExercise({
  clip,
  index,
  frames,
}: {
  clip: AissaClip;
  index: number;
  frames: number;
}) {
  const f = useCurrentFrame();
  const current = Math.min(frames, f + 1);
  return (
    <AbsoluteFill style={{ background: "#03070f", color: C.ice }}>
      {/* Keep every original frame at normal speed; all graphics sit outside the image. */}
      <OffthreadVideo
        src={staticFile(clip.src)}
        volume={0.85}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 944,
          objectFit: "contain",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 136,
          background: C.ink,
          borderTop: "1px solid #33445e",
          display: "flex",
          alignItems: "center",
          padding: "0 74px",
          gap: 30,
        }}
      >
        <div
          style={{
            font: `62px ${face}`,
            color: clip.accent,
            minWidth: 78,
            transform: `translateY(${(1 - enter(f)) * 25}px)`,
          }}
        >
          {pad(index + 1)}
        </div>
        <div style={{ height: 64, width: 2, background: "#34405a" }} />
        <div
          style={{
            minWidth: 620,
            transform: `translateX(${(1 - enter(f, 2)) * 30}px)`,
            opacity: lerp(f, 0, 12, 0.4, 1),
          }}
        >
          <div
            style={{
              font: `40px ${face}`,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {clip.name}
          </div>
          <div
            style={{
              font: `14px ${mono}`,
              letterSpacing: 2,
              color: C.muted,
              marginTop: 7,
            }}
          >
            {clip.category}
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ ...label, fontSize: 18 }}>
            AISSA{" "}
            <span style={{ color: C.muted }}>/ {pad(index + 1)} DE 08</span>
          </div>
          <div style={{ font: `18px ${mono}`, color: C.muted, marginTop: 12 }}>
            {atime(current)} <span style={{ color: "#4e607c" }}>/</span>{" "}
            {atime(frames)}
          </div>
        </div>
        <svg
          width="74"
          height="74"
          viewBox="0 0 74 74"
          style={{ marginLeft: 10, transform: "rotate(-90deg)" }}
        >
          <circle
            cx="37"
            cy="37"
            r="31"
            stroke="#27334a"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="37"
            cy="37"
            r="31"
            stroke={clip.accent}
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${(195 * current) / frames} 195`}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${(100 * current) / frames}%`,
            height: 3,
            background: clip.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
const reflections = [
  {
    small: "01 / OBSERVAR",
    title: ["EL PUNT", "DE PARTIDA."],
    text: "Vuit moviments. Un registre real per observar la tècnica, el control i l’estabilitat.",
    foot: "AVUI: DOCUMENTAR. DESPRÉS: COMPARAR.",
    image: "squat",
  },
  {
    small: "02 / CONSTRUIR",
    title: ["PRIMER,", "EL CONTROL."],
    text: "La qualitat del moviment va abans que la velocitat: una base estable, un ritme conscient i una execució progressiva.",
    foot: "CONTROL → CONSTÀNCIA → PROGRÉS",
    image: "pullup",
  },
  {
    small: "03 / EVOLUCIONAR",
    title: ["EL SEGÜENT", "PAS."],
    text: "Repetir les proves en les mateixes condicions i comparar les gravacions per valorar l’evolució.",
    foot: "EL PROGRÉS ES TREBALLA. I ES POT VEURE.",
    image: "hero",
  },
];
function AissaReflection({ index }: { index: number }) {
  const f = useCurrentFrame(),
    r = reflections[index];
  return (
    <AbsoluteFill
      style={{ background: C.ice, color: C.ink, overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          left: "52%",
          right: 0,
          top: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <Img
          src={art(r.image)}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "right center",
            transform: `scale(${1.04 + f * 0.0002})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg,#edf4fa55,transparent 40%)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "49%",
          top: -150,
          width: 100,
          height: 1500,
          background: C.ice,
          transform: "rotate(8deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 85,
          top: 84,
          ...label,
          color: C.blue,
        }}
      >
        {r.small}
      </div>
      <div style={{ position: "absolute", left: 85, top: 240, width: 930 }}>
        {r.title.map((line, i) => (
          <RevealText key={line} size={116} delay={i * 7} color={C.ink}>
            {line}
          </RevealText>
        ))}
        <div
          style={{ marginTop: 36, width: 95, height: 7, background: C.orange }}
        />
        <p
          style={{
            font: `29px/1.5 ${sans}`,
            maxWidth: 750,
            marginTop: 36,
            opacity: lerp(f, 20, 34, 0, 1),
            transform: `translateY(${(1 - enter(f, 18)) * 25}px)`,
          }}
        >
          {r.text}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          left: 85,
          bottom: 90,
          font: `bold 18px ${mono}`,
          letterSpacing: 1,
          color: C.blue,
        }}
      >
        {r.foot}
      </div>
      <div
        style={{
          position: "absolute",
          right: 48,
          bottom: 40,
          font: `13px ${mono}`,
          color: "white",
          background: "#080f20bb",
          padding: "8px 12px",
        }}
      >
        FOTOGRAFIA IA · CONCEPTUAL
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: lerp(f, 0, 13, 1920, 0),
          background: C.blue,
        }}
      />
    </AbsoluteFill>
  );
}
function AissaEnd() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: C.ink,
        color: C.ice,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Signal />
      <Corners color="#496185" />
      <div
        style={{
          position: "absolute",
          font: `620px ${face}`,
          color: "#164bff22",
          transform: `translateX(${-f * 1.5}px)`,
        }}
      >
        AISSA
      </div>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ ...label, color: C.orange, marginBottom: 34 }}>
          AIXÒ NOMÉS ÉS EL PRINCIPI.
        </div>
        <RevealText size={196}>AISSA.</RevealText>
        <div
          style={{
            height: 6,
            width: lerp(f, 10, 38, 0, 360),
            background: C.blue,
            margin: "30px auto",
          }}
        />
        <div style={{ ...label, color: C.muted }}>
          AVALUACIÓ INICIAL / EDUCACIÓ FÍSICA
        </div>
      </div>
      <AbsoluteFill
        style={{
          background: "#000",
          opacity: lerp(f, AEND - 20, AEND - 1, 0, 1),
        }}
      />
    </AbsoluteFill>
  );
}
export function AissaMovie() {
  const t = aissaTimeline();
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <Audio
        src={staticFile("audio/aissa-drive.mp3")}
        loop
        loopVolumeCurveBehavior="extend"
        volume={(f) =>
          (f >= t.exercises[0].from && f < t.outro ? 0.09 : 0.46) *
          lerp(f, 0, 25, 0, 1) *
          lerp(f, t.total - 60, t.total - 1, 1, 0)
        }
      />
      <Sequence durationInFrames={AINTRO}>
        <AissaIntro />
      </Sequence>
      {t.previews.map((c, i) => (
        <Sequence key={"p" + c.id} from={c.from} durationInFrames={APREVIEW}>
          <AissaPreview clip={c} index={i} />
        </Sequence>
      ))}
      <Sequence from={t.bridge} durationInFrames={ABRIDGE}>
        <AissaBridge />
      </Sequence>
      {t.exercises.map((c, i) => (
        <Sequence key={c.id} from={c.from} durationInFrames={c.frames}>
          <AissaExercise clip={c} index={i} frames={c.frames} />
        </Sequence>
      ))}
      {reflections.map((r, i) => (
        <Sequence
          key={r.small}
          from={t.outro + i * ACARD}
          durationInFrames={ACARD}
        >
          <AissaReflection index={i} />
        </Sequence>
      ))}
      <Sequence from={t.end} durationInFrames={AEND}>
        <AissaEnd />
      </Sequence>
    </AbsoluteFill>
  );
}
