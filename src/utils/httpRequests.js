async function postData(url="",token,data= {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
    });

    return response.json()
}

async function getData(url="",token="") {
    const response = await fetch(url,{
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": token
        }
    });

    return response.json()
}

export {postData,getData}