import {useEffect, useState} from "react";

export function useCountdown(startValue: number = 10000, tickMs:number = 10): [number, boolean, () => void, () => void, (val?:number) => void] {
    const [value, setValue] = useState(startValue);
    const [isCountingDown, setIsCountingDown] = useState(false);
    function start() {
        setIsCountingDown(true);
    }
    function pause() {
        setIsCountingDown(false);
    }
    function reset(valueOverride?: number) {
        setIsCountingDown(false);
        setValue(valueOverride || startValue);
    }
    useEffect(() => {
        function decrement() {
            if(isCountingDown) {
                setValue(value -1);
            }
        }
        const tick = setInterval(decrement, tickMs)

        return () => {
            clearInterval(tick)
        };
    }, [value, isCountingDown, tickMs]);
    return [value, isCountingDown, start, pause, reset];
}
