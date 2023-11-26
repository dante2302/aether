const baseUrl = 'http://localhost:3030/users';
const dataUrl = 'http://localhost:3030/data/userData';

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
    console.log(userData)
    console.log(serverData)
    console.table({...serverData,...userData})
    return {...serverData,...userData} 
  }
  catch(err){
    alert("Data is not seeded yed!")
  }
}

export const signUp = async ({email,password,username}) => {
  try{
    const response = await fetch(`${baseUrl}/register`,{
      'method': 'POST',
      'body': JSON.stringify({
        email,
        password
    })})
    const serverData = await response.json()
    const userData = await createUserData(serverData._id,username)
    return {...serverData,...userData} 

  }

  catch(error){
    alert(error)
  }
}

export const getUserDataProp = async(_id,prop) => {
  const userData = await getUserEntryData(_id)
  console.log(userData)
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
    avatar:'',
    banner:'',
    posts:[],
    channels:[],
    savedPosts:["ab1200ba-d7e8-45d5-8fc3-736b85f234af"],
    likedPosts:[],
    dislikedPosts:[],
    comments:[],
    socialLinks:[],
    _createdOn:Date.now(),
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

export const getUserDataByUsername = async (username) => {
  const response = await fetch(`${dataUrl}`,{method:'GET'})
  const allUserData = await response.json()
  return (Object.values(allUserData).find(userEntry => userEntry.username == username))
}

export const editUserData = async (_id,oldData,newData) => {
  const response = await fetch(`${dataUrl}/${_id}`,{
    method:'PATCH',
    'headers':{
    'Access-Control-Allow-Methods': ['PATCH'],
    'Content-type':'application/json'
    },
    'body':JSON.stringify({
      ...oldData,
      ...newData
    }),
    method:'CORS'
    })
}
