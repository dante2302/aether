const baseUrl = 'http://localhost:3030/users/login'

export const getUser = async (id) => {
  const email = 'admin@abv.bg'
  const password = 'admin'
  try{
    let data = await fetch(baseUrl,{
      'method':'POST',
      'body': JSON.stringify({
      'email': `${email}`,
      'password': `${password}`})
    })
    data = await data.json()
    return data
  }
  catch(err){
    console.log(err)
  }
}
export const makeUser = async () => {
  try{
    let data = await fetch(baseUrl,{
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'X-Admin': ''
      }
    }
    )
  }
  catch(err){
    console.log(err)
  }
}
