import { useState,useEffect } from "react"
import { Link } from "react-router-dom"

const ServerTime = () => {
    const SERVER_API = "https://localhost:7217/api"
    const [time,setTime] = useState('')

    const fetch_server_time = async () => {
        try{
            const response = await fetch(`${SERVER_API}/Time/Server`)
            const data = await response.json()
            setTime(data.serverTime)
        }
        catch{
            setTime("failed to get server time")
        }
    }

    useEffect(() => {
        fetch_server_time()
    },[])

    return(
        <>
            <h1>{time}</h1>
            <Link to={"/"}>
                <button type="button">go back to homepage</button>
            </Link>
        </>
    )
}

export default ServerTime