import {Toggle} from "../../components";
import {useTheme} from "../../hooks";

export function ThemePage() {
    const [theme, toggleTheme] = useTheme()
    return(
        <>
            <Toggle name='theme-toggle' label="Toggle theme" onToggle={toggleTheme}></Toggle>
            <DisplayTheme theme={theme}></DisplayTheme>
        </>
    )
}

function DisplayTheme(props: {theme: string}) {
    return (
        <div>Now showing the {props.theme} theme</div>
    )
}
