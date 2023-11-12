import {Timer} from "../../components/Timer";

export function TimerPage() {
    return (
        <>
            <div className="grid-x">
                <div className="cell small-4">
                    <div className='card'>
                        <Timer value={10} tickMs={1000}></Timer>
                    </div>
                </div>
                <div className="cell small-4">
                    <div className='card'>
                        <Timer value={50000} tickMs={1}></Timer>
                    </div>
                </div>
                <div className="cell small-4">
                    <div className='card'>
                        <Timer value={100} tickMs={10}></Timer>
                    </div>
                </div>
            </div>
        </>
    )
}
