import React from "react";
import { Composition, registerRoot } from "remotion";
import { Movie } from "./Movie";
import { defaults, FPS, TOTAL } from "../data";
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
        durationInFrames={TOTAL}
        defaultProps={defaults}
      />
    ))}
  </>
);
registerRoot(Root);
