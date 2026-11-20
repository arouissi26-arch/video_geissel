import React from "react";
import { Composition, registerRoot } from "remotion";
import { Movie } from "./Movie";
import { defaults, FPS, timeline } from "../data";
import "@fontsource/space-grotesk/latin-700.css";
import { AissaMovie } from "./Aissa";
import { AFPS, aissaTimeline } from "../aissa-data";
const Root = () => (
  <>
    <Composition
      id="Aissa"
      component={AissaMovie}
      width={1920}
      height={1080}
      fps={AFPS}
      durationInFrames={aissaTimeline().total}
    />
    {[false, true].map((tall) => (
      <Composition
        key={String(tall)}
        id={tall ? "Vertical" : "Avaluacio"}
        component={Movie}
        width={tall ? 1080 : 1920}
        height={tall ? 1920 : 1080}
        fps={FPS}
        durationInFrames={timeline(defaults.clips).total}
        calculateMetadata={({ props }) => ({
          durationInFrames: timeline(props.clips).total,
        })}
        defaultProps={defaults}
      />
    ))}
  </>
);
registerRoot(Root);
