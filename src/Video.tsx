import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {AUDIO_PATH, DURATION_IN_FRAMES, EXERCISE_FRAMES, exercises, INTRO_FRAMES, OUTRO_FRAMES} from './config/video';
import {Ejercicio} from './components/Ejercicio';
import {Intro} from './components/Intro';
import {Outro} from './components/Outro';

const MusicBed: React.FC = () => {
  const sourceFrame = useCurrentFrame();
  const volume = interpolate(
    sourceFrame,
    [0, 20, 30, INTRO_FRAMES, INTRO_FRAMES + 9 * EXERCISE_FRAMES - 75, INTRO_FRAMES + 9 * EXERCISE_FRAMES, DURATION_IN_FRAMES - 60, DURATION_IN_FRAMES],
    [0.16, 0.45, 0.86, 0.78, 0.82, 0.96, 0.72, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.quad)
    }
  );
  return <Audio src={staticFile(AUDIO_PATH)} volume={volume} />;
};

export const AvaluacioInicial: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#080A0D', overflow: 'hidden'}}>
    <MusicBed />
    <Sequence from={0} durationInFrames={INTRO_FRAMES} name="Intro — Avaluació inicial">
      <Intro />
    </Sequence>
    {exercises.map((exercise, index) => (
      <Sequence
        key={exercise.numero}
        from={INTRO_FRAMES + index * EXERCISE_FRAMES}
        durationInFrames={EXERCISE_FRAMES}
        name={`${String(exercise.numero).padStart(2, '0')} — ${exercise.nombre}`}
      >
        <Ejercicio {...exercise} />
      </Sequence>
    ))}
    <Sequence
      from={INTRO_FRAMES + exercises.length * EXERCISE_FRAMES}
      durationInFrames={OUTRO_FRAMES}
      name="Outro — Reflexió personal"
    >
      <Outro />
    </Sequence>
  </AbsoluteFill>
);
