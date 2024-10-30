import useInterval from 'beautiful-react-hooks/useInterval';

const Timer = ({ callback, interval, stopOnNext, setStopOnNext }) => {
    useInterval(() => {
        if (stopOnNext) {
            setStopOnNext(false)
            return; // Skip the callback
        }
        callback();
    }, interval);
    return null;
};

export default Timer;