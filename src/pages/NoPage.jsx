import { Link } from "react-router-dom"

const NoPage = () => {
    return(
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100%"}}>
                <h1>Oopss... it seems this page doesn't exist</h1>
                <Link to="/"><button className="btn btn-primary">Back to Homepage</button></Link>
            </div>
        </>
    )
}

export default NoPage