export const authorize = async (user, password) => {
  try{
    const body = JSON.stringify({
      "email" : "savtym1@asdfghj.com",
      "password": "qwerty1234"
    });
  
    const response = await fetch("http://localhost:8080/api/v1/user/signin", {
      method: 'POST',
      body: JSON.stringify({
        "email" : "savtym1@asdfghj.com",
        "password": "qwerty1234"
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      
    const data = await response.json();
    return data
  
  } catch (error){
    console.log("!ERROR", error)
  }
}

export const createSocket = async (token) => {
  try{
    const response = await fetch("http://localhost:8080/api/v1/socket", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdnR5bTFAYXNkZmdoai5jb20iLCJ1c2VybmFtZSI6InNhdnR5bTEiLCJpYXQiOjE1MjM5MDQzMTl9.QNHXz9KqLlTS2HFqnaLlUqLbMvl1yCl5n-Z_rqDP9M0"
      })
    })
      
    // const data = await response.json();
    // return data
  
  } catch (error){
    console.log("!ERROR", error)
  }
}