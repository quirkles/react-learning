export function List(props: {
    accessToken: string
}) {
    return (
        <div>
            <p>Hello {props.accessToken}</p>
        </div>
    )
}
