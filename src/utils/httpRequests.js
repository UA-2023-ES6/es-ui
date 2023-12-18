async function postData(url="",token,data= {}) {
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(data)
        });

        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json()
    } catch(error) {
        throw error;
    }

}

async function deleteData(url = "", token, data = {}) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

async function getData(url="",token="") {
    try {
        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: token,
          },
        });
    
        if (!response.ok) {
          if (response.status === 403){
            return "Forbidden"
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
      } catch (error) {
        throw error;
      }
}

export {postData,getData,deleteData}