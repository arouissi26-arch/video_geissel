import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

const seeded = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};
const PARTICLES = Array.from({length: 64}, (_, index) => ({
  x: seeded(index + 1) * 100,
  y: seeded(index + 97) * 100,
  radius: 1 + seeded(index + 221) * 3,
  speed: 0.16 + seeded(index + 412) * 0.55,
  phase: seeded(index + 713) * Math.PI * 2,
  tail: seeded(index + 916) > 0.76
}));

export const AnimatedBackdrop: React.FC<{variant: 'intro' | 'outro'}> = ({variant}) => {
  const frame = useCurrentFrame();
  const isOutro = variant === 'outro';
  const primary = isOutro ? '#FF704B' : '#D8FF45';
  const secondary = isOutro ? '#65DDFC' : '#62EBCB';
  const drift = frame * (isOutro ? 0.34 : 0.25);
  const orbX = 49 + Math.sin(frame / 43 + (isOutro ? 1.6 : 0)) * 11;
  const orbY = 34 + Math.cos(frame / 51) * 7;

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#080A0D'}}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(ellipse at ${orbX}% ${orbY}%, ${primary}2B 0%, transparent 39%), radial-gradient(ellipse at ${100 - orbX}% ${70 - (orbY - 34)}%, ${secondary}1D 0%, transparent 42%), linear-gradient(145deg, #11151B 0%, #07090C 61%, #111219 100%)`,
          transform: `scale(1.04) rotate(${Math.sin(frame / 100) * 0.5}deg)`
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 'auto -20% -7% -20%',
          height: '56%',
          opacity: isOutro ? 0.2 : 0.17,
          backgroundImage: `linear-gradient(${primary}3A 1px, transparent 1px), linear-gradient(90deg, ${secondary}30 1px, transparent 1px)`,
          backgroundSize: '86px 86px',
          transform: `perspective(680px) rotateX(59deg) translateY(${drift}px) scale(1.25)`,
          transformOrigin: 'center bottom',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 32%, black 100%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 920,
          height: 920,
          borderRadius: '50%',
          border: `1px solid ${primary}2A`,
          left: '50%',
          top: '43%',
          transform: `translate(-50%, -50%) rotate(${frame * (isOutro ? -0.22 : 0.2)}deg) scale(${1 + Math.sin(frame / 24) * 0.018})`,
          boxShadow: `0 0 80px ${primary}0B, inset 0 0 100px ${secondary}09`
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 45,
            borderRadius: '50%',
            border: `1px dashed ${secondary}28`,
            transform: `rotate(${frame * 0.47}deg)`
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 11,
            height: 11,
            borderRadius: '50%',
            backgroundColor: primary,
            top: 88,
            left: 120,
            boxShadow: `0 0 30px ${primary}`
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${primary}0B 49.95%, ${primary}24 50%, transparent 50.08%)`,
          opacity: 0.7,
          transform: `translateX(${Math.sin(frame / 20) * 3}px)`
        }}
      />
      {PARTICLES.map((particle, index) => {
        const x = (particle.x + Math.sin(frame * particle.speed / 25 + particle.phase) * 2.4 + 100) % 100;
        const y = (particle.y - (frame * particle.speed * 0.06) + 100) % 100;
        const pulse = 0.3 + (Math.sin(frame / 12 + particle.phase) + 1) * 0.25;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: particle.radius,
              height: particle.tail ? particle.radius * 5 : particle.radius,
              borderRadius: particle.radius,
              background: index % 4 === 0 ? secondary : primary,
              opacity: pulse,
              transform: `rotate(${Math.sin(frame / 19 + particle.phase) * 28}deg)`,
              boxShadow: `0 0 13px ${index % 4 === 0 ? secondary : primary}66`
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 45%, #05070AE8 100%)`,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.14,
          pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 4px)',
          backgroundPositionY: `${frame % 4}px`,
          mixBlendMode: 'soft-light'
        }}
      />
    </AbsoluteFill>
  );
};
