
const baseUrl = 'http://localhost:3030/users';
const dataUrl = 'http://localhost:3030/data/userData';
import { equalSign } from '../utils/encodeUtils.js'
import { inEncodedQuotes } from '../utils/encodeUtils.js'

export const logIn = async (email,password) => {
  try{
    let response = await fetch(`${baseUrl}/login`,{
      'method':'POST',
      'body': JSON.stringify({
        email,
        password
    })})
    const serverData = await response.json()
    const userData = await getUserDataByProp('_ownerId',serverData._id)
    return {...serverData,...userData} 
  }
  catch(err){
    alert(err)
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
    const userData = await createUserData(username,serverData.accessToken)
    return {...serverData,...userData} 

  }

  catch(error){
    alert(error)
  }
}


const createUserData = async (username,accessToken) => {
   const response = await fetch(dataUrl,{
   'method': 'POST',
    'headers':{
      'X-Authorization': accessToken,
      'Content-type':'application/json'
    },
   'body':JSON.stringify({
    username:username,
    avatar:'',
    banner:'',
    posts:[],
    channels:[],
    authorChannels:[],
    savedPosts:[],
    likedPosts:[],
    dislikedPosts:[],
    comments:[],
    socialLinks:[],
    _createdOn:Date.now(),
   }),
  'mode':'cors'
  })  
  let data = await response.json()
  return data
}

export const getUserDataByProp = async (prop,value) => {
  const response = await fetch(`${dataUrl}?where=${prop}${equalSign}${inEncodedQuotes(value)}`,{
    'method' : 'GET'
  })
  let data = await response.json()
  data = data[0]
  return data
}

export const updateUserData = async (userData,newData) => {
  const response = await fetch(`${dataUrl}/${userData._id}`,{
    method:'PATCH',
    headers:{
      'X-Authorization': userData.accessToken,
      'Content-Type':'application/json'
    },
   'body':JSON.stringify(newData)
  })
  const data = await response.json()
  if(response){
    return {...userData,...data}
  }
}
