import "./Timer.scss"
import {useCountdown} from "../../hooks/useCountdown";

export function Timer(props: {
    value?: number,
    tickMs?: number
}){
    const {value: startVal = 100, tickMs = 1000} = props
    const [
        value,
        isCountingDown,
        start,
        pause,
        reset
    ] = useCountdown(startVal, tickMs)
    return (
        <div className='timer'>
            <h2>{value}</h2>
            <div>
                <button className="button"
                    onClick={isCountingDown ?  pause : start}
                >{isCountingDown ? "Stop" : "Start"}</button>
                <button className="button" onClick={() => reset()}>Reset</button>
            </div>
        </div>
    )
}
