import config from '../config';


export const authorize = async (user, password) => {
  try{
    const body = JSON.stringify({
      "email" : "savtym@gmail.com",
      "password": "qwerty123"
    });
    console.log(config)
  
    const response = await fetch(config.apiDomain + "/api/v1/user/signin", {
      method: 'POST',
      body: JSON.stringify({
        "email" : "savtym@gmail.com",
        "password": "qwerty123"
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
    const response = await fetch(config.apiDomain + "/api/v1/socket", {
      method: 'POST',
      body: JSON.stringify({test: 'test'}),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
    })
      
    // const data = await response.json();
    // return data
  
  } catch (error){
    console.log("!ERROR", error)
  }
}