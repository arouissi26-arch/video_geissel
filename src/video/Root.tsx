import React from "react";
import { Composition, registerRoot } from "remotion";
import { Movie } from "./Movie";
import { defaults, FPS, timeline } from "../data";
import "@fontsource/space-grotesk/latin-700.css";
const Root = () => (
  <>
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
