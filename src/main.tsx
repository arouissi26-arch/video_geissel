import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player, PlayerRef } from "@remotion/player";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  Layers3,
  Film,
  FolderOpen,
  AudioLines,
  Sparkles,
  Flag,
  Clapperboard,
  X,
  Upload,
  Timer,
  Monitor,
  ChevronRight,
  LayoutPanelTop,
} from "lucide-react";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import { Movie } from "./video/Movie";
import {
  defaults,
  active,
  clock,
  colors,
  scenes,
  names,
  questions,
  BLOCK,
  TOTAL,
} from "./data";
import "./style.css";
const pad = (v: number) => String(v).padStart(2, "0");
function Logo() {
  return (
    <svg
      viewBox="0 0 34 32"
      width="33"
      height="31"
      fill="currentColor"
      aria-hidden
    >
      <path d="M2 28 10 4h7L9 28zM12 19 26 4h8L20 19l7 9h-9z" />
    </svg>
  );
}
function App() {
  const ref = useRef<PlayerRef>(null),
    screen = useRef<HTMLDivElement>(null),
    dialog = useRef<HTMLDialogElement>(null);
  const [frame, F] = useState(24),
    [playing, P] = useState(false),
    [muted, M] = useState(false),
    [panel, D] = useState(false),
    [tab, T] = useState("Clips"),
    [props, S] = useState(defaults),
    [err, E] = useState(""),
    [fsErr, FS] = useState("");
  const index = active(frame);
  const urls = useRef<string[]>([]);
  const player = () => ref.current!;
  const seek = (i: number) =>
    player().seekTo(Math.max(0, Math.min(TOTAL - 1, i)));
  const goto = (i: number) => seek(i * BLOCK);
  const open = () => {
    player().pause();
    D(true);
  };
  useEffect(() => {
    if (panel) dialog.current?.showModal();
  }, [panel]);
  useEffect(() => {
    const p = player();
    const update = (e: { detail: { frame: number } }) => F(e.detail.frame);
    const play = () => P(true),
      pause = () => P(false);
    p.addEventListener("frameupdate", update);
    p.addEventListener("play", play);
    p.addEventListener("pause", pause);
    p.addEventListener("ended", pause);
    return () => {
      p.removeEventListener("frameupdate", update);
      p.removeEventListener("play", play);
      p.removeEventListener("pause", pause);
      p.removeEventListener("ended", pause);
      urls.current.forEach(URL.revokeObjectURL);
    };
  }, []);
  const file = (f: File | undefined, i: number) => {
    if (!f) return;
    if (
      (i >= 0 && !/\.mp4$/i.test(f.name)) ||
      (i < 0 && !/\.(mp3|wav|m4a)$/i.test(f.name))
    ) {
      E("Format no admès. Tria un MP4 o un àudio MP3, WAV o M4A.");
      return;
    }
    const src = URL.createObjectURL(f);
    urls.current.push(src);
    S((old) =>
      i < 0
        ? { ...old, audio: src }
        : { ...old, clips: old.clips.map((c, n) => (i === n ? src : c)) },
    );
    E("");
  };
  const toggle = (e: React.MouseEvent) => player().toggle(e);
  return (
    <>
      <header>
        <div className="topwrap">
          <div className="brand">
            <Logo /> KINETIK
            <span className="brandline" />
            <small>Motion Studio</small>
          </div>
          <nav>
            <button className={!panel ? "navsel" : ""} onClick={() => D(false)}>
              <LayoutPanelTop size={15} />
              Estudi
            </button>
            <button className={panel ? "navsel" : ""} onClick={open}>
              <FolderOpen size={16} />
              Materials
            </button>
          </nav>
          <span className="live">
            <i /> SISTEMA ACTIU
          </span>
        </div>
      </header>
      <main>
        <section className="heading">
          <div>
            <div className="kicker">
              <b>PROJECTE 001</b>
              <span>/</span> EDUCACIÓ FÍSICA
            </div>
            <h1>
              Avaluació inicial<span>.</span>
            </h1>
            <p>
              Estudi de força <b>·</b> Seqüència d’avaluació física
            </p>
          </div>
          <button
            className="playall"
            onClick={(e) => {
              seek(0);
              player().play(e);
            }}
          >
            <Play size={15} fill="currentColor" />
            Reproduir sessió
          </button>
        </section>
        <div className="grid">
          <section className="monitor" ref={screen}>
            <div className="panelhead">
              <h2>
                <Monitor />
                Monitor de vídeo
              </h2>
              <div className="previewbadge">
                <i /> PREVISUALITZACIÓ
              </div>
            </div>
            <div className="movie">
              <Player
                ref={ref}
                component={Movie}
                inputProps={props}
                durationInFrames={TOTAL}
                fps={30}
                compositionWidth={1920}
                compositionHeight={1080}
                initialFrame={24}
                style={{ width: "100%", aspectRatio: "16/9" }}
                clickToPlay
                numberOfSharedAudioTags={3}
                acknowledgeRemotionLicense
              />
              <input
                className="scrub"
                aria-label="Posició de reproducció"
                type="range"
                min={0}
                max={TOTAL - 1}
                value={frame}
                onChange={(e) => seek(Number(e.target.value))}
                style={{
                  background: `linear-gradient(90deg,var(--lime) ${(frame / TOTAL) * 100}%,#575a50 ${(frame / TOTAL) * 100}%)`,
                }}
              />
            </div>
            <div className="controls">
              <div className="transport">
                <button
                  title={playing ? "Pausa" : "Reprodueix"}
                  className="primary"
                  onClick={toggle}
                >
                  {playing ? (
                    <Pause fill="currentColor" />
                  ) : (
                    <Play fill="currentColor" />
                  )}
                </button>
                <button
                  title="Escena anterior"
                  onClick={() => goto(Math.max(0, index - 1))}
                >
                  <SkipBack />
                </button>
                <button
                  title="Escena següent"
                  onClick={() => goto(Math.min(10, index + 1))}
                >
                  <SkipForward />
                </button>
              </div>
              <small>
                {clock(frame)} <em>/ {clock(TOTAL)}</em>
              </small>
              <div className="ctlright">
                <button
                  title={muted ? "Activa el so" : "Silencia"}
                  onClick={() => {
                    muted ? player().unmute() : player().mute();
                    M(!muted);
                  }}
                >
                  {muted ? <VolumeX /> : <Volume2 />}
                </button>
                <button
                  title="Pantalla completa"
                  onClick={async () => {
                    try {
                      if (document.fullscreenElement)
                        await document.exitFullscreen();
                      else await screen.current?.requestFullscreen();
                    } catch {
                      FS(
                        "Pantalla completa no disponible en aquest navegador.",
                      );
                    }
                  }}
                >
                  <Maximize />
                </button>
              </div>
            </div>
            {fsErr && <small>{fsErr}</small>}
            <div className="monitorfoot">
              <span>
                <i /> REMOTION ENGINE
              </span>
              <span>
                1920 × 1080 <b>/</b> 30 FPS
              </span>
            </div>
          </section>
          <aside className="index">
            <div className="panelhead">
              <h2>
                <Layers3 />
                Escenes
              </h2>
              <span className="pill">11 BLOCS</span>
            </div>
            <div className="list">
              {scenes.map((s, i) => (
                <button
                  key={s}
                  className={"row " + (i === index ? "selected" : "")}
                  onClick={() => goto(i)}
                >
                  <span className="tile" style={{ background: colors[i] }}>
                    {i === 0 ? (
                      <Sparkles size={16} />
                    ) : i === 10 ? (
                      <Flag size={16} />
                    ) : (
                      pad(i)
                    )}
                  </span>
                  <strong>{s}</strong>
                  <small>{clock(i * BLOCK)}</small>
                  {i === index ? (
                    <AudioLines className="activebars" size={13} />
                  ) : (
                    <span className="dotspacer" />
                  )}
                </button>
              ))}
            </div>
            <div className="sidefoot">
              <span className="smalldot" />{" "}
              {index === 0
                ? "INTRO"
                : index === 10
                  ? "OUTRO"
                  : `EXERCICI ${pad(index)}`}
              <span> BLOC {pad(index + 1)} / 11</span>
            </div>
          </aside>
        </div>
        <section className="timeline">
          <div className="timehead">
            <h2>
              <Clapperboard />
              Línia de temps
            </h2>
            <div className="tmeta">
              <Timer size={13} /> 00:52 <i /> 120 BPM
            </div>
          </div>
          <div className="tracks">
            <div className="tracklabel rulerlabel">TC</div>
            <div
              className="ruler"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                seek(Math.round(((e.clientX - r.left) / r.width) * TOTAL));
              }}
            >
              {[0, 8, 16, 24, 32, 40, 48].map((n) => (
                <span key={n} style={{ left: `${(n / 52) * 100}%` }}>
                  {clock(n * 30)}
                </span>
              ))}
            </div>
            <div className="tracklabel">
              <Film /> VÍDEO
            </div>
            <div className="strip">
              {scenes.map((s, i) => (
                <button
                  title={s}
                  key={s}
                  style={{ background: colors[i], flex: i === 10 ? 3 : 1 }}
                  className={index === i ? "clip sel" : "clip"}
                  onClick={() => goto(i)}
                >
                  {i === 0 ? "INTRO" : i === 10 ? "OUTRO" : pad(i)}
                </button>
              ))}
              <div
                className="playhead"
                style={{ left: `${(frame / TOTAL) * 100}%` }}
              />
            </div>
            <div className="tracklabel">
              <AudioLines /> ÀUDIO
            </div>
            <div className="wave" title="Pista musical">
              <svg viewBox="0 0 1200 36" preserveAspectRatio="none" aria-hidden>
                <path
                  stroke="#a593c1"
                  strokeWidth="1.6"
                  d={Array.from({ length: 510 }, (_, i) => {
                    const y =
                      2 +
                      Math.abs(Math.sin(i * 31.1) * Math.cos(i * 0.17)) * 14;
                    return `M${i * 2.36} ${18 - y}v${y * 2}`;
                  }).join(" ")}
                />
              </svg>
              <b>
                ♫ &nbsp;
                {props.audio === defaults.audio &&
                props.audio.endsWith("pulse.mp3")
                  ? "Pulse Drive"
                  : "Pista importada"}
              </b>
            </div>
          </div>
        </section>
        <footer>
          <span>
            KINETIK <b>/</b> MOTION STUDIO
          </span>
          <span>PROJECTE LOCAL &nbsp; • &nbsp; V.1.0</span>
        </footer>
      </main>
      {panel && (
        <dialog ref={dialog} onCancel={() => D(false)} onClose={() => D(false)}>
          <div className="dialoghead">
            <div className="kicker">PROJECTE 001 / RECURSOS</div>
            <button aria-label="Tanca" onClick={() => D(false)}>
              <X />
            </button>
          </div>
          <h2>Materials de sessió</h2>
          <p>
            Prova els fitxers i les respostes en aquesta previsualització. Els
            canvis del navegador duren fins que recarreguis la pàgina.
          </p>
          <div className="tabs">
            {["Clips", "Música", "Respostes"].map((t) => (
              <button
                className={tab === t ? "on" : ""}
                key={t}
                onClick={() => T(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === "Clips" ? (
            <>
              <p>
                Per al render, desa els MP4 a <code>public/clips/</code>.
              </p>
              {names.map((name, i) => (
                <label className="fileline" key={name}>
                  {defaults.clips[i] &&
                    !props.clips[i]?.startsWith("blob:") && (
                      <img
                        alt=""
                        width="52"
                        height="32"
                        src={`/thumbs/${i + 1}.jpg`}
                      />
                    )}
                  <strong>
                    {pad(i + 1)} · {name}
                    <small>exercici-{i + 1}.mp4</small>
                  </strong>
                  <span>{props.clips[i] ? "Disponible" : "Pendent"}</span>
                  <Upload size={17} />
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => file(e.target.files?.[0], i)}
                  />
                </label>
              ))}
            </>
          ) : tab === "Música" ? (
            <>
              <p>
                Pista original a 120 BPM. Per substituir-la al render, desa{" "}
                <code>public/audio/music.mp3</code>.
              </p>
              <label className="fileline">
                <strong>
                  {props.audio === defaults.audio
                    ? props.audio.split("/").pop()
                    : "Pista importada"}
                </strong>
                <span>Canvia la pista</span>
                <Upload size={17} />
                <input
                  type="file"
                  accept=".mp3,.wav,.m4a"
                  onChange={(e) => file(e.target.files?.[0], -1)}
                />
              </label>
            </>
          ) : (
            questions.map((q, i) => (
              <label className="answer" key={q}>
                {q}
                <input
                  maxLength={95}
                  value={props.answers[i]}
                  onChange={(e) =>
                    S({
                      ...props,
                      answers: props.answers.map((v, n) =>
                        n === i ? e.target.value : v,
                      ),
                    })
                  }
                />
              </label>
            ))
          )}
          {err && <p role="alert">{err}</p>}
          <button className="done" onClick={() => D(false)}>
            Torna a l’estudi <ChevronRight size={16} />
          </button>
        </dialog>
      )}
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
