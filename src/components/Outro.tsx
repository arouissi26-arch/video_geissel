import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedBackdrop} from './AnimatedBackdrop';
import {KineticWords} from './KineticText';

const questions = [
  {number: '01', text: 'El meu punt fort inicial és:', accent: '#D8FF45'},
  {number: '02', text: 'El moviment que més necessito millorar és:', accent: '#67DFFF'},
  {number: '03', text: 'Objectiu personal per al final del curs:', accent: '#FF704B'}
];

const QuestionCard: React.FC<{number: string; text: string; accent: string}> = ({number, text, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const panel = spring({frame: frame - 3, fps, config: {damping: 13, stiffness: 145, mass: 0.62}});
  const underline = spring({frame: frame - 24, fps, config: {damping: 18, stiffness: 94}});
  return (
    <AbsoluteFill style={{fontFamily: 'Studio Inter, Arial, sans-serif', color: '#F5F5EE'}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 76, display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: panel, transform: `translateY(${(1 - panel) * -24}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 13}}>
          <span style={{fontFamily: 'Studio Mono, monospace', fontSize: 16, letterSpacing: '0.16em', color: accent}}>REFLEXIÓ / {number}</span>
          <span style={{height: 1, width: 52, background: `${accent}88`}} />
          <span style={{fontSize: 14, letterSpacing: '0.1em', color: 'rgba(245,245,238,0.5)'}}>AVALUACIÓ INICIAL</span>
        </div>
        <div style={{display: 'flex', gap: 8}}>
          {questions.map((item) => <span key={item.number} style={{width: item.number === number ? 29 : 9, height: 7, borderRadius: 8, background: item.number === number ? accent : 'rgba(255,255,255,0.23)', boxShadow: item.number === number ? `0 0 16px ${accent}90` : 'none'}} />)}
        </div>
      </div>
      <div style={{position: 'absolute', left: 68, right: 66, top: '22%', transform: `translateY(${(1 - panel) * 50}px)`}}>
        <div style={{fontFamily: 'Studio Anton, Impact, sans-serif', color: 'rgba(255,255,255,0.09)', fontSize: 260, lineHeight: 0.75, letterSpacing: '-0.06em', position: 'absolute', top: -135, left: -8, transform: `scale(${0.92 + panel * 0.08})`, transformOrigin: 'left center'}}>{number}</div>
        <div style={{position: 'relative', zIndex: 1, fontFamily: 'Studio Mono, monospace', fontSize: 16, letterSpacing: '0.2em', color: accent, marginBottom: 25, opacity: panel}}>PREGUNTA / {number} — TANCAMENT</div>
        <KineticWords
          text={text}
          stagger={7}
          style={{maxWidth: 1640, position: 'relative', zIndex: 1, fontFamily: 'Studio Anton, Impact, sans-serif', fontSize: 96, lineHeight: 1.02, letterSpacing: '-0.045em', textTransform: 'uppercase'}}
          wordStyle={{textShadow: '0 5px 30px rgba(0,0,0,0.38)'}}
        />
        <div style={{height: 2, width: `${Math.min(100, underline * 100)}%`, marginTop: 32, background: `linear-gradient(90deg, ${accent}, ${accent}28, transparent)`, boxShadow: `0 0 22px ${accent}60`}} />
      </div>
      <div style={{position: 'absolute', left: 68, right: 68, bottom: 170, padding: '22px 24px 20px', border: `1px solid ${accent}55`, borderRadius: 5, background: 'linear-gradient(105deg, rgba(17,20,25,0.62), rgba(17,20,25,0.24))', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', boxShadow: `0 18px 70px rgba(0,0,0,0.25), 0 0 35px ${accent}0D`, opacity: panel, transform: `translate3d(0, ${(1 - panel) * 52}px, 0)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontFamily: 'Studio Mono, monospace', fontSize: 14, color: accent, letterSpacing: '0.15em'}}>LA TEVA RESPOSTA</span>
          <span style={{fontFamily: 'Studio Mono, monospace', fontSize: 12, color: 'rgba(245,245,238,0.42)'}}>____________________</span>
        </div>
        <div style={{height: 1, marginTop: 20, background: 'rgba(255,255,255,0.16)'}} />
      </div>
      <div style={{position: 'absolute', bottom: 86, left: 68, right: 68, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Studio Mono, monospace', fontSize: 12, letterSpacing: '0.16em', color: 'rgba(245,245,238,0.45)'}}>
        <span>OBSERVA EL TEU PROGRÉS</span>
        <span style={{color: accent}}>{number} / 03 — REFLEXIÓ FINAL</span>
      </div>
    </AbsoluteFill>
  );
};

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [0, 45, 210], [0, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const flash = interpolate(frame, [214, 216, 219, 224], [0, 0.95, 0.3, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fade = interpolate(frame, [224, 239], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#080A0D'}}>
      <AnimatedBackdrop variant="outro" />
      <div style={{position: 'absolute', inset: 0, opacity: 0.5, background: `linear-gradient(118deg, transparent 0%, transparent ${Math.max(0, sweep * 24 - 20)}%, rgba(255,112,75,0.12) ${sweep * 24}%, transparent ${sweep * 24 + 22}%)`, mixBlendMode: 'screen'}} />
      {questions.map((question, index) => (
        <Sequence key={question.number} from={index * 72} durationInFrames={72} name={`Pregunta ${question.number}`}>
          <QuestionCard {...question} />
        </Sequence>
      ))}
      <div style={{position: 'absolute', inset: 0, zIndex: 40, backgroundColor: '#FFFFFF', opacity: flash, mixBlendMode: 'screen', pointerEvents: 'none'}} />
      <div style={{position: 'absolute', inset: 0, zIndex: 41, backgroundColor: '#050608', opacity: fade, pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
