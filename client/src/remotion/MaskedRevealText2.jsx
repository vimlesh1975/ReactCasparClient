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
          overflow: "hidden", 
          clipPath: `inset(0 ${clipPathValue}% 75% 0)`, // 1st line
          // clipPath: `inset(25% ${clipPathValue}% 50% 0%)`, // 2nd line
          // clipPath: `inset(50% ${clipPathValue}% 25% 0%)`, // 3rd line
          // clipPath: `inset(75% ${clipPathValue}% 0% 0%)`, // 4th line
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export default MaskedRevealText2;
