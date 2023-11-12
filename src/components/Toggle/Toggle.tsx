import {SyntheticEvent} from "react";
import {v4} from "uuid";

interface ToggleProps {
    label: string;
    name: string;
    onToggle: (e?: SyntheticEvent) => void
}

export function Toggle(props: ToggleProps) {
    const id = v4()
    return (
        <div className="switch">
            <input className="switch-input" id={id} type="checkbox" name={props.name} onChange={props.onToggle}/>
            <label className="switch-paddle" htmlFor={id}>
                <span className="show-for-sr">{props.label}</span>
            </label>
        </div>
    )
}
