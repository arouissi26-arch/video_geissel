import React from "react";
// Port of the skill's moody grade (scripts/fx.py: grade): desaturate about
// luminance, gamma 1.3, cool shadows/warm highlights, then 1.12 contrast.
// Blend the look with the source so the filmed movement stays easy to read.
export function Grade({ id }: { id: string }) {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values=".7196 .2348 .0456 0 0  .1196 .8348 .0456 0 0  .1196 .2348 .6456 0 0  0 0 0 1 0"
          />
          <feComponentTransfer result="base">
            <feFuncR type="gamma" amplitude=".88" exponent="1.3" />
            <feFuncG type="gamma" amplitude=".88" exponent="1.3" />
            <feFuncB type="gamma" amplitude=".88" exponent="1.3" />
          </feComponentTransfer>
          <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 .08 .07  0 0 0 -.02 .135  0 0 0 -.105 .165  0 0 0 0 1"
          />
          <feComposite
            in2="base"
            operator="arithmetic"
            k2="1.12"
            k3="1.12"
            k4="-.0824"
          />
          <feComposite
            in2="SourceGraphic"
            operator="arithmetic"
            k2=".55"
            k3=".45"
          />
        </filter>
      </defs>
    </svg>
  );
}
