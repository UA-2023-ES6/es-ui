import { Link } from "react-router-dom"

const NoPage = () => {
    return(
        <>
            <h1>Page not found</h1>
            <Link to={"/"}>
                <button type="button">go back to homepage</button>
            </Link>
        </>
    )
}

export default NoPage