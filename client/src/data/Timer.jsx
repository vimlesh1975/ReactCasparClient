import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ setAndPlay, dataLength }) => {
    const [counter, setCounter] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [intervalDuration, setIntervalDuration] = useState(3000); // Default interval duration is 1000ms (1 second)
    const intervalId = useRef(null);

    useEffect(() => {
        if (isActive) {
            intervalId.current = setInterval(() => {

                setAndPlay(counter)
                if (counter < dataLength - 1) {
                    setCounter(prevCounter => prevCounter + 1);
                }
                if (counter >= (dataLength - 1)) {
                    setCounter(0);
                }
                // Perform any other repetitive work here
                // console.log('Repetitive work done', counter + 1);
            }, intervalDuration);
        } else if (intervalId.current) {
            clearInterval(intervalId.current);
        }

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId.current);
    }, [isActive, intervalDuration, setAndPlay, counter, dataLength]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
    };
    const resetCounter = () => {
        setCounter(0);
    };


    const handleIntervalChange = (e) => {
        setIntervalDuration(Number(e.target.value));
    };

    return (
        <div>
            <p>Counter: {counter}</p>
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
        </div>
    );
};


export default Timer;
