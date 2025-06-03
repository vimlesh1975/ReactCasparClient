'use client'

import { useEffect } from "react";
import debounce from "lodash.debounce"; // Importing debounce from lodash
// import io from "socket.io-client";
import socket from "./socket"; // assumes shared instance

export const UseSocketControls = ({
    fromStart,
    handleDoubleClick,
    slugs,
    currentStoryNumber,
    onclickSlug,
    previous,
    next,
    speed,
    setSpeed,
    tempSpeed,
    setTempSpeed,
}) => {
    useEffect(() => {
        const handleButtonDown = debounce((msg) => {
            console.log(msg);
            if (msg === 1) setSpeed(0);
            // else if (msg === 2) setSpeed(-3);
            else if (msg === 2) setSpeed(-1);
            // else if (msg === 3) setSpeed((val) => val - 1);
            else if (msg === 3) setSpeed(-2);
            else if (msg === 4) fromStart();
            else if (msg === 5) setSpeed(1);
            else if (msg === 6) setSpeed(2);
            else if (msg === 7) setSpeed(3);
            else if (msg === 8) setSpeed(4);
            else if (msg === 9) setSpeed(5);
            else if (msg === 10) {
                // onclickSlug(slugs[4], 4);
                // handleDoubleClick(4);
                previous();

            } else if (msg === 11) {
                // onclickSlug(slugs[9], 9);
                // handleDoubleClick(9);
                next();
            } else if (msg === 12) {
                // onclickSlug(slugs[14], 14);
                // handleDoubleClick(14);
            } else if (msg === 13) {
                // onclickSlug(slugs[currentStoryNumber + 4], currentStoryNumber + 4);
                // handleDoubleClick(currentStoryNumber + 4);
            } else if (msg === 14) {
                // previous();
                if (speed === 0) {
                    setSpeed(tempSpeed);
                } else {
                    setTempSpeed(speed);
                    setSpeed(0);
                }
            } else if (msg === 15) {
                // next();
                if (speed === 0) {
                    setSpeed(tempSpeed);
                } else {
                    setTempSpeed(speed);
                    setSpeed(0);
                }
            }
        }, 300);

        const handleJogdir = debounce((msg) => {
            console.log(msg);
            if (msg === 1) setSpeed(1);
            else if (msg === -1) setSpeed(-1);
        }, 300);

        const handleShuttle = debounce((msg) => {
            console.log(msg);
            setSpeed(msg);
        }, 300);

        socket.on("buttondown1", handleButtonDown);
        socket.on("jog-dir1", handleJogdir);
        socket.on("shuttle1", handleShuttle);

        return () => {
            socket.off("buttondown1", handleButtonDown);
            socket.off("jog-dir1", handleJogdir);
            socket.off("shuttle1", handleShuttle);
        };
    }, [
        setSpeed,
        fromStart,
        handleDoubleClick,
        slugs,
        currentStoryNumber,
        onclickSlug,
        previous,
        next,
        setTempSpeed, speed, tempSpeed
    ]);
    return <></>
};
