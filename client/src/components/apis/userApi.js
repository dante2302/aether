const baseUrl = 'http://localhost:3030/users';
const dataUrl = 'http://localhost:3030/data/userData';

import * as request from './request.js'

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
  const bodyData = {
    email,
    password
  }

  const url = `${baseUrl}/register`

  try{
    const response = await fetch(
      url,{
      method: 'POST',
      body:JSON.stringify(bodyData)})

    const serverData = await response.json()

    const userData = await createUserData(username,serverData.accessToken)
    return {...serverData,...userData} 

  }

  catch(error){
    alert(error)
  }
}


const createUserData = async (username,accessToken) => {
  const bodyData = {
    username:username,
    posts:[],
    channels:[],
    authorChannels:[],
    savedPosts:[],
    likedPosts:[],
    dislikedPosts:[],
    comments:[],
    socialLinks:[],
  }
  const data = await request.post({url:dataUrl,accessToken,bodyData})
  return data
}

export const getUserDataByProp = async (prop,value) => {
  const data = await request.search({url:dataUrl,prop,value})
  return data[0]
}

export const updateUserData = async (userData,newData) => {
  const url = `${dataUrl}/${userData._id}`
  const data = await request.patchWithAuth({url, accessToken:userData.accessToken, newData})
  return {...userData,...data}
}

