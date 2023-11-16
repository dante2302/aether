const baseUrl = 'http://localhost:3030/users';
const dataUrl = 'http://localhost:3030/jsonstore/userData';

export const logIn = async (email,password) => {
  try{
    let response = await fetch(`${baseUrl}/login`,{
      'method':'POST',
      'body': JSON.stringify({
        email,
        password
    })})
    const serverData = await response.json()
    const userData = await getUserEntryData(serverData._id)
    return {...userData,...serverData} 
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
        password
    })})
    const serverData = await response.json()
    const userData = await createUserData(serverData._id,username)
    return {...userData,...serverData}

  }

  catch(error){
    alert(error)
  }
}

export const getUserDataProp = async(_id,prop) => {
  const userData = await getUserEntry(_id)
  return userData.prop
}

const createUserData = async (_id,username) => {
   const response = await fetch(dataUrl,{
   'method': 'POST',
    'headers':{
      'Content-type':'application/json'
    },
   'body':JSON.stringify({
    userId: _id,
    username:username,
    posts:[],
    channels:[],
    savedPosts:[],
    likedPosts:[],
    comments:[],
    socialLinks:[]
   }),
  'mode':'cors'
  })  
  let data = await(response.json())
  return data
}

const getUserEntryData = async (_id) => {
  const response = await fetch(`${dataUrl}`,{method:'GET'})
  const allUserData = await response.json()
  return Object.values(allUserData).find(userEntry => userEntry.userId == _id)
}
