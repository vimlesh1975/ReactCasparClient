import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ setAndPlay, dataLength, stop, counter, setCounter }) => {
    const [isActive, setIsActive] = useState(false);
    const [intervalDuration, setIntervalDuration] = useState(8000);
    const intervalId = useRef(null);

    useEffect(() => {
        if (isActive) {
            intervalId.current = setInterval(() => {
                setCounter(prevCounter => {
                    const newCounter = (prevCounter < dataLength - 1) ? prevCounter + 1 : 0;
                    setAndPlay(newCounter);
                    return newCounter;
                });
            }, intervalDuration);
        } else if (intervalId.current) {
            clearInterval(intervalId.current);
        }

        return () => clearInterval(intervalId.current);
    }, [isActive, intervalDuration, setAndPlay, dataLength, setCounter]);

    const handleStart = () => {
        setAndPlay(counter);
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
        stop();
    };

    const resetCounter = () => {
        setCounter(0);
    };

    const handleIntervalChange = (e) => {
        setIntervalDuration(Number(e.target.value));
    };

    const handleCounterChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0 && value < dataLength) {
            setCounter(value);
        }
    };

    return (
        <div>
            <label>
                Counter:
                <input
                    type="number"
                    value={counter}
                    onChange={handleCounterChange}
                    min={0}
                    max={dataLength - 1}
                />
            </label>
            <label>
                Interval (ms):
                <input
                    type="number"
                    value={intervalDuration}
                    onChange={handleIntervalChange}
                />
            </label>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={resetCounter}>Reset</button>
            {isActive ? 'Timer Running' : 'Timer Stopped'}
        </div>
    );
};

export default Timer;
