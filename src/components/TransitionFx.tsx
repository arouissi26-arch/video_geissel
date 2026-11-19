import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {TransitionStyle} from '../config/video';

export const sceneEntranceStyle = (style: TransitionStyle, frame: number, fps: number): React.CSSProperties => {
  const p = Math.min(1, Math.max(0, spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 170, mass: 0.68}
  })));
  const settle = Math.max(0, interpolate(frame, [0, 18], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  switch (style) {
    case 'zoom-blast':
      return {transform: `scale(${1.17 - p * 0.17})`, filter: `blur(${settle * 15}px)`};
    case 'diagonal-wipe': {
      const edge = p * 122;
      return {clipPath: `polygon(0% 0%, ${edge}% 0%, ${Math.max(0, edge - 20)}% 100%, 0% 100%)`};
    }
    case 'whip-pan':
      return {transform: `translate3d(${(1 - p) * -105}%, 0, 0) skewX(${settle * -13}deg)`, filter: `blur(${settle * 18}px)`};
    case 'shutter':
      return {transform: `scaleY(${0.12 + p * 0.88})`, transformOrigin: 'center top', filter: `blur(${settle * 7}px)`};
    case 'glitch':
      return {transform: `translate3d(${Math.sin(frame * 8) * settle * 12}px, ${Math.cos(frame * 5) * settle * 5}px, 0)`, filter: `saturate(${1.1 + settle * 0.6}) hue-rotate(${settle * 12}deg)`};
    case 'circle-burst':
      return {clipPath: `circle(${p * 150}% at 50% 48%)`};
    case 'slide-up':
      return {transform: `translate3d(0, ${(1 - p) * 100}%, 0)`, filter: `blur(${settle * 9}px)`};
    case 'split-reveal':
      return {clipPath: `inset(0 ${50 * (1 - p)}% 0 ${50 * (1 - p)}%)`};
    case 'scanline':
      return {clipPath: `inset(0 0 ${100 * (1 - p)}% 0)`};
    default:
      return {};
  }
};

export const TransitionFx: React.FC<{style: TransitionStyle; colorAccent: string}> = ({style, colorAccent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = Math.min(1, Math.max(0, spring({frame, fps, config: {damping: 16, stiffness: 190, mass: 0.62}})));
  const fade = Math.max(0, 1 - p);
  const flash = interpolate(frame, [0, 1, 4, 8], [0.82, 0.34, 0.06, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const base: React.CSSProperties = {position: 'absolute', inset: 0, pointerEvents: 'none'};
  const stripes = Array.from({length: 8}, (_, index) => index);

  return (
    <div style={{...base, zIndex: 80, overflow: 'hidden'}}>
      {style === 'zoom-blast' && (
        <div style={{
          ...base,
          inset: '14%',
          border: `2px solid ${colorAccent}`,
          borderRadius: '50%',
          opacity: fade * 0.85,
          transform: `scale(${1.6 - p * 0.95})`,
          boxShadow: `0 0 70px ${colorAccent}90, inset 0 0 40px ${colorAccent}55`
        }} />
      )}
      {style === 'diagonal-wipe' && (
        <div style={{
          ...base,
          background: `linear-gradient(110deg, ${colorAccent} 0%, ${colorAccent}E8 42%, #FFFFFF 43%, #FFFFFF 44%, transparent 44%)`,
          opacity: fade * 0.92,
          transform: `translate3d(${(1 - p) * -18}%, 0, 0) skewX(-8deg)`
        }} />
      )}
      {style === 'whip-pan' && (
        <div style={{...base, opacity: fade, transform: `translateX(${(1 - p) * 48}%) skewX(-18deg)`}}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{
              position: 'absolute',
              top: `${23 + index * 17}%`,
              left: '-24%',
              width: '150%',
              height: index === 1 ? 9 : 4,
              background: index === 1 ? '#FFFFFFE8' : `${colorAccent}B3`,
              boxShadow: `0 0 30px ${colorAccent}`
            }} />
          ))}
        </div>
      )}
      {style === 'shutter' && stripes.map((stripe) => (
        <div key={stripe} style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${stripe * 12.5}%`,
          width: '12.5%',
          background: stripe % 2 ? `${colorAccent}35` : '#07090CDE',
          transform: `scaleY(${fade * (stripe % 2 ? 0.9 : 1)})`,
          transformOrigin: stripe % 2 ? 'top' : 'bottom',
          opacity: fade * 0.9
        }} />
      ))}
      {style === 'glitch' && (
        <>
          {[0, 1, 2].map((slice) => (
            <div key={slice} style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${24 + slice * 23}%`,
              height: `${3 + (slice % 2) * 2}%`,
              background: slice === 1 ? '#FFFFFF' : (slice === 0 ? '#FF315A' : '#3CF6FF'),
              opacity: fade * (slice === 1 ? 0.52 : 0.7),
              transform: `translateX(${(slice % 2 ? 1 : -1) * fade * (22 + slice * 11)}px)`,
              mixBlendMode: 'screen'
            }} />
          ))}
          <div style={{...base, background: `${colorAccent}12`, opacity: fade, mixBlendMode: 'screen'}} />
        </>
      )}
      {style === 'circle-burst' && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '48%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          border: `5px solid ${colorAccent}`,
          boxShadow: `0 0 70px ${colorAccent}A0`,
          opacity: fade,
          transform: `translate(-50%, -50%) scale(${0.15 + p * 2.5})`
        }} />
      )}
      {style === 'slide-up' && (
        <div style={{
          ...base,
          inset: 'auto 0 0',
          height: '52%',
          background: `linear-gradient(0deg, ${colorAccent}9C 0%, ${colorAccent}24 40%, transparent 100%)`,
          transform: `translateY(${(1 - p) * 48}%)`,
          opacity: fade
        }} />
      )}
      {style === 'split-reveal' && (
        <>
          {[0, 1].map((side) => (
            <div key={side} style={{
              position: 'absolute',
            inset: '0 auto 0 0',
            left: side === 0 ? '0%' : '50%',
            width: '50%',
            background: `linear-gradient(90deg, ${colorAccent} 0%, #101319 75%)`,
            transform: `translateX(${side === 0 ? -p * 100 : p * 100}%)`,
            opacity: fade * 0.65
            }} />
          ))}
          <div style={{position: 'absolute', top: 0, bottom: 0, left: '50%', width: 3, background: '#fff', opacity: fade, boxShadow: `0 0 28px ${colorAccent}`}} />
        </>
      )}
      {style === 'scanline' && (
        <>
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${p * 110 - 10}%`,
            height: '16%',
            background: `linear-gradient(180deg, transparent, ${colorAccent}B8 48%, #FFFFFF 52%, transparent)`,
            opacity: fade * 0.9,
            filter: 'blur(2px)'
          }} />
          <div style={{...base, inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 11px, rgba(255,255,255,0.22) 12px)', opacity: fade * 0.45}} />
        </>
      )}
      <div style={{...base, background: '#FFFFFF', opacity: flash, mixBlendMode: 'screen'}} />
      <div style={{...base, background: `radial-gradient(circle at 50% 48%, ${colorAccent}85 0%, transparent 54%)`, opacity: flash * 0.5, mixBlendMode: 'screen'}} />
    </div>
  );
};
