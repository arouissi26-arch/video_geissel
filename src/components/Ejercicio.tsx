import React from 'react';
import {AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ExerciseData, EXERCISE_FRAMES} from '../config/video';
import {KineticLetters} from './KineticText';
import {ProgressHud} from './ProgressHud';
import {sceneEntranceStyle, TransitionFx} from './TransitionFx';

export type EjercicioProps = Pick<ExerciseData, 'numero' | 'nombre' | 'clip' | 'clipAvailable' | 'colorAccent' | 'transition' | 'tag'>;

const MissingClipCard: React.FC<{numero: number; nombre: string; colorAccent: string}> = ({numero, nombre, colorAccent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame: frame - 12, fps, config: {damping: 15, stiffness: 120}});
  const pulse = 0.45 + (Math.sin(frame / 8) + 1) * 0.16;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: 'linear-gradient(148deg, #151820 0%, #090B10 56%, #18140F 100%)'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 78% 37%, ${colorAccent}25 0%, transparent 34%), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: 'auto, 76px 76px, 76px 76px', transform: `translateY(${frame * -0.4}px)`}} />
      <div style={{position: 'absolute', width: 560, height: 560, border: `1px solid ${colorAccent}50`, borderRadius: '50%', left: '50%', top: '45%', transform: `translate(-50%, -50%) rotate(${frame * 0.35}deg) scale(${0.98 + Math.sin(frame / 19) * 0.03})`}}>
        <div style={{position: 'absolute', inset: 40, border: `1px dashed ${colorAccent}55`, borderRadius: '50%'}} />
        <div style={{position: 'absolute', width: 12, height: 12, background: colorAccent, left: '12%', top: '19%', boxShadow: `0 0 22px ${colorAccent}`}} />
      </div>
      <div style={{position: 'absolute', inset: '34% 9% auto', textAlign: 'center', opacity: reveal, transform: `translateY(${(1 - reveal) * 54}px)`}}>
        <div style={{fontFamily: 'Studio Mono, monospace', fontSize: 17, letterSpacing: '0.18em', color: colorAccent, marginBottom: 15}}>REGISTRE NO DISPONIBLE / {String(numero).padStart(2, '0')}</div>
        <div style={{fontFamily: 'Studio Anton, Impact, sans-serif', fontSize: 104, lineHeight: 0.95, letterSpacing: '-0.035em', color: '#F5F5EE', textTransform: 'uppercase'}}>{nombre}</div>
      </div>
      <div style={{position: 'absolute', left: '50%', bottom: 286, transform: 'translateX(-50%)', width: 660, textAlign: 'center'}}>
        <div style={{display: 'inline-flex', gap: 12, alignItems: 'center', border: `1px solid ${colorAccent}70`, borderRadius: 100, padding: '14px 22px', color: '#F4F4ED', background: '#101318AA', boxShadow: `0 0 40px ${colorAccent}16`}}>
          <span style={{width: 9, height: 9, background: colorAccent, borderRadius: '50%', opacity: pulse, boxShadow: `0 0 18px ${colorAccent}`}} />
          <span style={{fontFamily: 'Studio Mono, monospace', fontSize: 15, letterSpacing: '0.08em'}}>SENSE REGISTRE VISUAL</span>
        </div>
        <div style={{fontSize: 18, color: 'rgba(245,245,237,0.55)', marginTop: 18}}>Seqüència mantinguda amb gràfica de suport.</div>
      </div>
      <div style={{position: 'absolute', left: 58, right: 58, bottom: 110, height: 1, background: `linear-gradient(90deg, transparent, ${colorAccent}88, transparent)`}} />
      <div style={{position: 'absolute', top: '22%', left: 0, width: `${(frame % 120) / 120 * 100}%`, height: 2, background: `linear-gradient(90deg, transparent, ${colorAccent}A0)`, opacity: 0.7}} />
    </AbsoluteFill>
  );
};

const CornerLock: React.FC<{colorAccent: string}> = ({colorAccent}) => {
  const frame = useCurrentFrame();
  const offset = Math.sin(frame / 18) * 5;
  const pieces = [
    {top: 265, left: 58, rotate: 0},
    {top: 265, right: 58, rotate: 90},
    {bottom: 355, left: 58, rotate: -90},
    {bottom: 355, right: 58, rotate: 180}
  ];
  return <>
    {pieces.map((piece, index) => {
      const {rotate, ...position} = piece;
      return <div key={index} style={{position: 'absolute', width: 50 + offset, height: 50 + offset, borderTop: `2px solid ${colorAccent}88`, borderLeft: `2px solid ${colorAccent}88`, transform: `rotate(${rotate}deg)`, opacity: 0.7, ...position}} />;
    })}
  </>;
};

export const Ejercicio: React.FC<EjercicioProps> = ({numero, nombre, clip, clipAvailable, colorAccent, transition, tag}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 7, fps, config: {damping: 12, stiffness: 165, mass: 0.56}});
  const scale = spring({frame: frame - 3, fps, config: {damping: 11, stiffness: 230, mass: 0.58}});
  const cameraPush = interpolate(frame, [0, EXERCISE_FRAMES - 1], [1, 1.07], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const headlineSize = nombre.length > 12 ? 73 : 88;

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#080A0D', color: '#F5F5EE', fontFamily: 'Studio Inter, Arial, sans-serif', ...sceneEntranceStyle(transition, frame, fps)}}>
      {clipAvailable ? (
        <AbsoluteFill style={{overflow: 'hidden', transform: `scale(${cameraPush})`, transformOrigin: '50% 48%'}}>
          <OffthreadVideo
            src={staticFile(clip)}
            muted
            volume={0}
            trimBefore={0}
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%', filter: 'saturate(0.84) contrast(1.17) brightness(0.80)'}}
          />
          <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(4,7,10,0.48) 0%, rgba(4,7,10,0.05) 26%, transparent 42%, rgba(5,7,10,0.06) 55%, rgba(5,7,10,0.88) 100%)'}} />
          <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.36) 100%)', mixBlendMode: 'multiply'}} />
          <div style={{position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 5px)', backgroundPositionY: `${frame % 5}px`, mixBlendMode: 'soft-light'}} />
        </AbsoluteFill>
      ) : (
        <MissingClipCard numero={numero} nombre={nombre} colorAccent={colorAccent} />
      )}

      <div style={{position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none'}}>
        <div style={{position: 'absolute', left: 62, top: '20%', opacity: 0.12 + enter * 0.08, transform: `translateY(${(1 - scale) * 84}px) scale(${0.82 + scale * 0.18}) rotate(${(1 - scale) * -11}deg)`, transformOrigin: 'left center', fontFamily: 'Studio Anton, Impact, sans-serif', fontSize: 360, lineHeight: 0.85, color: 'transparent', WebkitTextStroke: `2px ${colorAccent}`, textShadow: `0 0 45px ${colorAccent}40`}}>
          {String(numero).padStart(2, '0')}
        </div>
        <div style={{position: 'absolute', right: 68, top: '31%', color: colorAccent, fontFamily: 'Studio Mono, monospace', fontSize: 15, letterSpacing: '0.14em', writingMode: 'vertical-rl', opacity: 0.8}}>
          TEST INICIAL / {String(numero).padStart(2, '0')}
        </div>

        <ProgressHud numero={numero} colorAccent={colorAccent} />
        <CornerLock colorAccent={colorAccent} />

        <div style={{position: 'absolute', bottom: 164, left: 60, right: 60, display: 'flex', alignItems: 'flex-end', gap: 23, opacity: enter, transform: `translate3d(${(1 - enter) * -125}px, 0, 0)`}}>
          <div style={{width: 4, height: 118, flex: '0 0 4px', background: `linear-gradient(180deg, ${colorAccent}, ${colorAccent}40)`, boxShadow: `0 0 22px ${colorAccent}90`, transform: `scaleY(${enter})`, transformOrigin: 'bottom'}} />
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12}}>
              <span style={{fontFamily: 'Studio Mono, monospace', color: colorAccent, fontSize: 15, letterSpacing: '0.14em', padding: '5px 9px', borderLeft: `2px solid ${colorAccent}`, background: `linear-gradient(105deg, ${colorAccent}24, ${colorAccent}08)`, boxShadow: `0 4px 18px ${colorAccent}10`, transform: 'rotate(-1deg)'}}>{tag}</span>
              <span style={{width: 44, height: 1, background: `${colorAccent}90`}} />
              <span style={{fontFamily: 'Studio Mono, monospace', color: 'rgba(245,245,238,0.58)', fontSize: 13, letterSpacing: '0.1em'}}>MOVIMENT {String(numero).padStart(2, '0')}</span>
            </div>
            <div style={{fontFamily: 'Studio Anton, Impact, sans-serif', fontSize: headlineSize, lineHeight: 0.94, letterSpacing: '-0.045em', textTransform: 'uppercase', textShadow: '0 5px 30px rgba(0,0,0,0.55)'}}>
              <KineticLetters text={nombre} delay={8} stagger={2} />
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 11, marginTop: 14, fontFamily: 'Studio Mono, monospace', fontSize: 13, letterSpacing: '0.17em', color: 'rgba(245,245,238,0.60)'}}>
              <span style={{color: colorAccent}}>●</span> AVALUACIÓ INICIAL <span style={{color: 'rgba(245,245,238,0.28)'}}>/</span> FORÇA I CONTROL
            </div>
          </div>
          <div style={{fontFamily: 'Studio Anton, Impact, sans-serif', fontSize: 86, lineHeight: 0.8, color: colorAccent, opacity: 0.86, transform: `scale(${0.7 + scale * 0.3}) rotate(${(1 - scale) * -12}deg)`, transformOrigin: 'bottom right'}}>
            {String(numero).padStart(2, '0')}
          </div>
        </div>

        <div style={{position: 'absolute', top: 152, right: 60, display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'Studio Mono, monospace', fontSize: 12, letterSpacing: '0.14em', color: '#F4F4ED', opacity: enter}}>
          <span style={{width: 7, height: 7, borderRadius: '50%', background: '#FF5A5F', boxShadow: '0 0 11px #FF5A5F'}} />
          <span>REC <span style={{color: colorAccent}}>00:{String(Math.floor(frame / 30)).padStart(2, '0')}</span></span>
        </div>
        <div style={{position: 'absolute', left: 62, right: 62, bottom: 121, height: 1, background: `linear-gradient(90deg, ${colorAccent}B0, rgba(255,255,255,0.08) 55%, transparent)`}} />
      </div>
      <TransitionFx style={transition} colorAccent={colorAccent} />
    </AbsoluteFill>
  );
};
