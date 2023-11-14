const baseUrl = 'http://localhost:3030/users'

export const logIn = async (email,password) => {
  try{
    let response = await fetch(`${baseUrl}/login`,{
      'method':'POST',
      'body': JSON.stringify({
        email,
        password
    })})
    // if(!response.ok){
    //   throw(new Error())
    // }
    let data = await response.json()
    return data
  }
  catch(err){
    alert(err)
  }
}

export const signUp = async (email,password,username) => {
  try{
    const response = await fetch(`${baseUrl}/register`,{
      'method': 'POST',
      'body': JSON.stringify({
        email,
        password,
        username,
      })})
    let data = await response.json()
    return data
  }
  catch(error){
    alert(error)
  }
}
  
