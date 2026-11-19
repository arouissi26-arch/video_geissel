import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const ProgressHud: React.FC<{numero: number; colorAccent: string}> = ({numero, colorAccent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const value = interpolate(frame, [0, 18], [(numero - 1) / 9, numero / 9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const reveal = spring({frame, fps, config: {damping: 18, stiffness: 125}});
  return (
    <div style={{position: 'absolute', zIndex: 12, top: 84, left: 58, right: 58, color: '#F4F4ED'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
        <div style={{display: 'flex', gap: 13, alignItems: 'center'}}>
          <span style={{width: 10, height: 10, borderRadius: '50%', background: colorAccent, boxShadow: `0 0 18px ${colorAccent}`}} />
          <span style={{fontFamily: 'Studio Mono, monospace', fontSize: 18, letterSpacing: '0.12em', opacity: 0.94}}>
            FORÇA <span style={{color: colorAccent}}>/</span> AVALUACIÓ
          </span>
        </div>
        <span style={{fontFamily: 'Studio Mono, monospace', fontSize: 20, letterSpacing: '0.08em'}}>
          {String(numero).padStart(2, '0')}<span style={{opacity: 0.4}}> / 09</span>
        </span>
      </div>
      <div style={{height: 3, borderRadius: 4, background: 'rgba(255,255,255,0.2)', overflow: 'visible', position: 'relative'}}>
        <div
          style={{
            width: `${Math.max(0, value * 100)}%`,
            height: '100%',
            transform: `scaleY(${0.75 + reveal * 0.25})`,
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${colorAccent}88, ${colorAccent})`,
            boxShadow: `0 0 20px ${colorAccent}80`,
            borderRadius: 4
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: `${Math.max(0, value * 100)}%`,
            top: '50%',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: `0 0 15px ${colorAccent}`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
    </div>
  );
};
