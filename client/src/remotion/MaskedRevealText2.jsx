import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

const MaskedRevealText2 = ({
  text,
  duration = 10,   // Duration in frames
  fontSize = 120,    // Font size of the text
  textWidth = 1800,  // The width of the text container
  textColor = "black",
}) => {
  const frame = useCurrentFrame();

  // Calculate the clip-path value to reveal the text gradually
  const clipPathValue = interpolate(
    frame,
    [0, duration], // From 0 to duration frames
    [100, 0],      // Start with the text fully clipped (100%) and reveal it to 0% (fully visible)
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
        // backgroundColor: backgroundColor,
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${textWidth}px`,
          fontSize: fontSize,
          color: textColor,
          overflow: "hidden", // Ensures that the text is revealed within bounds
          clipPath: `inset(0 ${clipPathValue}% 80% 0)`, // Clip the right side of the text
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export default MaskedRevealText2;
