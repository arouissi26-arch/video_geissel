import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const KineticLetters: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}> = ({text, delay = 0, stagger = 2, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <span style={{display: 'inline-block', whiteSpace: 'pre', ...style}}>
      {Array.from(text).map((character, index) => {
        const progress = spring({
          frame: frame - delay - index * stagger,
          fps,
          config: {damping: 13, stiffness: 180, mass: 0.55}
        });
        const lift = (1 - progress) * 56;
        const rotation = (1 - progress) * (index % 2 === 0 ? -10 : 10);
        return (
          <span
            key={`${character}-${index}`}
            style={{
              display: 'inline-block',
              opacity: progress,
              transform: `translate3d(0, ${lift}px, 0) rotate(${rotation}deg) scale(${0.72 + progress * 0.28})`,
              transformOrigin: '50% 100%'
            }}
          >
            {character === ' ' ? '\u00a0' : character}
          </span>
        );
      })}
    </span>
  );
};

export const KineticWords: React.FC<{
  text: string;
  stagger?: number;
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
}> = ({text, stagger = 7, style, wordStyle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.trim().split(/\s+/);
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', columnGap: '0.24em', rowGap: '0.05em', ...style}}>
      {words.map((word, index) => {
        const progress = spring({
          frame: frame - index * stagger,
          fps,
          config: {damping: 12, stiffness: 155, mass: 0.62}
        });
        return (
          <span
            key={`${word}-${index}`}
            style={{
              display: 'inline-block',
              opacity: progress,
              transform: `translate3d(0, ${(1 - progress) * 92}px, 0) rotateX(${(1 - progress) * -22}deg) scale(${0.92 + progress * 0.08})`,
              transformOrigin: '50% 100%',
              ...wordStyle
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
