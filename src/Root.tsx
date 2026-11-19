import React from 'react';
import {Composition} from 'remotion';
import {AvaluacioInicial} from './Video';
import {DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH} from './config/video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="AvaluacioInicial"
    component={AvaluacioInicial}
    durationInFrames={DURATION_IN_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
