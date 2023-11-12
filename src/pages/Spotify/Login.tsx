export function Login(props: {
    initiateLogin: () => void
}) {
    return (
        <div>
            <button className="button success" onClick={props.initiateLogin}>Login</button>
        </div>
    )
}
