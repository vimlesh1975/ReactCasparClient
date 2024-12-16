import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

const MaskedRevealText2 = ({
  text,
  duration = 20,    // Total duration in frames
  holdFrames = 50,   // Duration to hold the text fully visible
  fontSize = 120,    // Font size of the text
  textWidth = 1800,  // Width of the text container
  textColor = "black",
  lines = 4,         // Number of lines to reveal
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // position: "relative",
          width: `${textWidth}px`,
          fontSize: fontSize,
          color: textColor,
          overflow: "hidden",
        }}
      >
        {/* Loop through the lines and dynamically calculate `clipPath` for each line */}
        {Array.from({ length: lines }).map((_, index) => {
          const totalholdframe = 4 * holdFrames + ((holdFrames * (lines - index)) / 2 - 70);
          const totalDuration = (((index + 1) * duration) / lines) + totalholdframe + (((index + 1) * duration) / lines);

          const clipPathValue = interpolate(
            frame,
            [
              (index * duration) / lines,         // Start time for this line
              ((index + 1) * duration) / lines, // End time for this line
              (((index + 1) * duration) / lines) + totalholdframe,
              totalDuration

            ],
            [100, 0, 0, 100],         // From fully hidden to fully visible, stay, then fully hidden again

            {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }
          );

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                // top: `${index * 25}%`, // Vertical position for each line
                // left: 0,
                top: 0,
                width: "100%",
                clipPath: `inset(${index * 25}% ${clipPathValue}% ${(lines - index - 1) * 25}% 0)`,
                // lineHeight: `${fontSize * 1.2}px`,
              }}
            >
              {text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default MaskedRevealText2;
