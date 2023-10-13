import { useEffect, useState } from "react"

function App() {
    return(
        <>
            <ServerTime />
        </>
    )
  
}

function ServerTime() {
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
        <h1>{time}</h1>
    )
}



export default App;