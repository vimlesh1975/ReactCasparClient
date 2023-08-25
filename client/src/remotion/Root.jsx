import React from "react";
import { Composition } from "remotion";
import MyComposition from "./Composition";

export const RemotionRoot = () => {
    return (
        <>
            <Composition
                id="MyComposition"
                component={MyComposition}
                durationInFrames={60}
                fps={30}
                width={1280}
                height={720}
            />
            <Composition
                id="MyCompositionCopy"
                component={MyComposition}
                durationInFrames={60}
                fps={30}
                width={1280}
                height={720}
            />
        </>
    );
};