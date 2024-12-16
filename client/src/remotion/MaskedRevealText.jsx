import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

const MaskedRevealText = ({
  text,
  duration = 10,    // Duration in frames for the reveal/hide animation
  holdFrames = 50,   // Duration to hold the text fully visible
  fontSize = 120,    // Font size of the text
  textWidth = 1800,  // Width of the text container
  textColor = "black",
}) => {
  const frame = useCurrentFrame();

  // Total duration = reveal + hold + reverse
  const totalDuration = duration + holdFrames + duration;

  // Calculate the clip-path value based on the current frame
  const clipPathValue = interpolate(
    frame,
    [
      0,                      // Start of reveal
      duration,               // End of reveal
      duration + holdFrames,  // End of hold
      totalDuration,          // End of reverse
    ],
    [100, 0, 0, 100],         // From fully hidden to fully visible, stay, then fully hidden again
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${textWidth}px`,
          fontSize: fontSize,
          color: textColor,
          overflow: "hidden", // Ensures the text is revealed within bounds
          clipPath: (duration + holdFrames)>=frame?`inset(0 ${clipPathValue}% 0 0)`:`inset(0 0 0 ${clipPathValue}%)`, // Reveal and reverse from left to right
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export default MaskedRevealText;
