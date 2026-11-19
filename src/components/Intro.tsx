import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedBackdrop} from './AnimatedBackdrop';
import {KineticLetters} from './KineticText';

const GlitchTitle: React.FC<{text: string; fontSize: number; delay: number}> = ({text, fontSize, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 155, mass: 0.6}});
  const lift = interpolate(entrance, [0, 1], [130, 0]);
  const glitch = interpolate(frame, [25, 29, 33, 39], [0, 1, 0.15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const common: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    whiteSpace: 'nowrap',
    fontFamily: 'Studio Anton, Impact, sans-serif',
    fontSize,
    lineHeight: 0.91,
    letterSpacing: '-0.045em',
    opacity: entrance,
    transform: `translate3d(0, ${lift}px, 0) skewX(${(1 - entrance) * -7}deg)`,
    transformOrigin: 'left center'
  };
  return (
    <div style={{position: 'relative', height: fontSize * 0.94, overflow: 'visible'}}>
      <span style={{...common, color: '#FF365E', mixBlendMode: 'screen', transform: `${common.transform} translateX(${-6 - glitch * 8}px)`, clipPath: 'inset(0 0 38% 0)'}}>{text}</span>
      <span style={{...common, color: '#44E9FF', mixBlendMode: 'screen', transform: `${common.transform} translateX(${7 + glitch * 10}px)`, clipPath: 'inset(34% 0 0 0)'}}>{text}</span>
      <span style={{...common, color: '#F6F6EF', textShadow: '0 5px 35px rgba(0,0,0,0.4)'}}>{text}</span>
      {glitch > 0.12 && (
        <span style={{
          position: 'absolute',
          left: `${8 + (frame % 4) * 2}%`,
          right: '5%',
          top: '46%',
          height: 5,
          background: '#FFFFFF',
          opacity: glitch * 0.8,
          transform: `translateX(${(frame % 2 ? 1 : -1) * glitch * 18}px)`,
          mixBlendMode: 'screen'
        }} />
      )}
    </div>
  );
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const badge = spring({frame: frame - 5, fps, config: {damping: 14, stiffness: 150}});
  const burst = interpolate(frame, [28, 32, 48], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const line = spring({frame: frame - 34, fps, config: {damping: 16, stiffness: 95}});
  const scribble = spring({frame: frame - 49, fps, config: {damping: 16, stiffness: 90}});

  return (
    <AbsoluteFill style={{overflow: 'hidden', color: '#F6F6EF', fontFamily: 'Studio Inter, Arial, sans-serif'}}>
      <AnimatedBackdrop variant="intro" />
      <div style={{position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none'}}>
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
          <path d="M 1195 745 C 1240 685, 1290 655, 1355 675 S 1450 712, 1425 761 C 1401 808, 1338 798, 1323 761 C 1310 728, 1347 712, 1380 725" fill="none" stroke="#D8FF45" strokeWidth="3" strokeLinecap="round" strokeDasharray="420" strokeDashoffset={420 * (1 - scribble)} opacity={scribble * 0.56} />
        </svg>
        <div style={{position: 'absolute', right: 54, top: '42%', fontFamily: 'Studio Anton, Impact, sans-serif', fontSize: 290, lineHeight: 0.82, letterSpacing: '-0.055em', color: 'rgba(246,246,239,0.035)', transform: `translateX(${Math.sin(frame / 26) * 14}px) rotate(-5deg)`, textShadow: '0 0 70px rgba(216,255,69,0.06)'}}>FORÇA</div>
        <div style={{position: 'absolute', left: 56, top: 72, opacity: badge, transform: `translateX(${(1 - badge) * -38}px)`, display: 'flex', gap: 15, alignItems: 'center'}}>
          <div style={{width: 42, height: 42, border: '1px solid #D8FF45', display: 'grid', placeItems: 'center', color: '#D8FF45', fontFamily: 'Studio Mono, monospace', fontSize: 16, transform: 'rotate(-8deg)'}}>A</div>
          <div>
            <div style={{fontFamily: 'Studio Mono, monospace', fontSize: 17, letterSpacing: '0.12em', color: '#F5F5ED', textShadow: '0 0 18px rgba(216,255,69,0.35)'}}>MOVEMENT / LAB</div>
            <div style={{fontSize: 13, letterSpacing: '0.2em', color: 'rgba(245,245,237,0.55)', marginTop: 5}}>EDUCACIÓ FÍSICA · 2026</div>
          </div>
        </div>
        <div style={{position: 'absolute', top: 87, right: 58, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: 'Studio Mono, monospace', opacity: badge}}>
          <span style={{fontSize: 15, letterSpacing: '0.16em', color: '#D8FF45'}}>PUNT DE PARTIDA</span>
          <span style={{fontSize: 12, opacity: 0.55, marginTop: 6}}>01 — 09 / PROTOCOL</span>
        </div>
        <div style={{position: 'absolute', left: 58, top: '23%', width: 2, height: '42%', background: 'linear-gradient(180deg, transparent, #D8FF45 20%, #D8FF4540 85%, transparent)', transform: `scaleY(${line})`, transformOrigin: 'top'}} />
        <div style={{position: 'absolute', right: 58, top: '25%', writingMode: 'vertical-rl', fontFamily: 'Studio Mono, monospace', fontSize: 13, letterSpacing: '0.24em', color: 'rgba(246,246,239,0.45)', opacity: line}}>TEST INICIAL // FORÇA I CONTROL</div>

        <div style={{position: 'absolute', left: 104, right: 52, top: '29%', transform: `translateY(${(1 - spring({frame: frame - 18, fps, config: {damping: 15, stiffness: 140}})) * 22}px)`}}>
          <div style={{fontFamily: 'Studio Mono, monospace', fontSize: 16, letterSpacing: '0.19em', color: '#D8FF45', marginBottom: 18, opacity: badge}}>
            BASELINE / MOVEMENT TEST <span style={{color: 'rgba(255,255,255,0.4)'}}>— 09 MOVIMENTS</span>
          </div>
          <GlitchTitle text="AVALUACIÓ" fontSize={198} delay={18} />
          <div style={{height: 12}} />
          <GlitchTitle text="INICIAL" fontSize={248} delay={23} />
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 34}}>
            <div style={{height: 2, width: 88, background: '#D8FF45', transform: `scaleX(${line})`, transformOrigin: 'left', boxShadow: '0 0 16px #D8FF45'}} />
            <div style={{fontSize: 39, lineHeight: 1, fontWeight: 500, letterSpacing: '-0.035em'}}>
              <KineticLetters text="Punt de partida" delay={31} stagger={2} />
            </div>
          </div>
        </div>

        <div style={{position: 'absolute', bottom: 76, left: 58, right: 58, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div>
            <div style={{fontFamily: 'Studio Mono, monospace', fontSize: 14, letterSpacing: '0.18em', opacity: 0.58, marginBottom: 9}}>AVALUACIÓ DE FORÇA</div>
            <div style={{fontSize: 19, letterSpacing: '0.02em'}}>Observeix. Mesura. Avança.</div>
          </div>
          <div style={{display: 'flex', gap: 7, alignItems: 'center'}}>
            <span style={{fontFamily: 'Studio Mono, monospace', fontSize: 12, color: '#D8FF45', letterSpacing: '0.14em'}}>INICI</span>
            <span style={{width: 55, height: 1, background: 'rgba(255,255,255,0.45)'}} />
            <span style={{fontFamily: 'Studio Mono, monospace', fontSize: 12, opacity: 0.55}}>01 / 09</span>
          </div>
        </div>

        <div style={{position: 'absolute', left: '50%', top: '52%', width: 530, height: 530, borderRadius: '50%', border: '2px solid #D8FF45', opacity: burst * 0.55, transform: `translate(-50%, -50%) scale(${0.25 + burst * 2.6})`, boxShadow: '0 0 80px #D8FF4550', mixBlendMode: 'screen'}} />
        <div style={{position: 'absolute', top: '19%', right: '19%', width: 10, height: 10, background: '#D8FF45', boxShadow: '0 0 24px #D8FF45', transform: `scale(${1 + burst * 2})`, opacity: 0.9}} />
      </div>
    </AbsoluteFill>
  );
};
