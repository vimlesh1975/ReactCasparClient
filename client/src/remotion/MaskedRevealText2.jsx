import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

const MaskedRevealText2 = ({
  text,
  duration = 40,    // Total duration in frames
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
          const clipPathValue = interpolate(
            frame,
            [
              (index * duration) / lines,         // Start time for this line
              ((index + 1) * duration) / lines, // End time for this line
            ],
            [100, 0], // Reveal from 100% hidden to 0% visible
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
                top:0,
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
