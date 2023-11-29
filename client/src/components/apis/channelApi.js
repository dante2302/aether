const baseUrl = 'http://localhost:3030/data/channels'
import {equalSign, inEncodedQuotes} from '../utils/encodeUtils.js'

export const createChannel = async (userData,{name,description}) => {
  try{
    let response = await fetch(`${baseUrl}`,{
      'method': 'POST',
      'headers':{
        'Content-Type': 'application/json',
        'X-Authorization': userData.accessToken
      },
      'body':JSON.stringify({
        name,
        description,
        members:[userData._ownerId],
        posts:[]
      }),
      'mode': 'cors'
    })
    const data = await response.json()
    updateUserData(userData,{channels: [...userData.channels,data._id]})
  }
  catch(error){
    alert(error)
  }
}


export const getChannelData = async (channelId) => {
  const response = await fetch(`${baseUrl}/${channelId}`,{method: 'GET'}) 
  return await response.json()
}

const getChannelCount = async () => {
  const response = await fetch(`${baseUrl}?count`,{method: 'GET'})
  return await response.json()
}

export const getChannelDataByProp = async (prop,value) => {
  const searchParam = `${prop}${equalSign}${inEncodedQuotes(value)}`
  const url = `${baseUrl}?where=${searchParam}`

  const response = await fetch(url,{method: 'GET'})
  const data = await response.json()

  return data[0]
}

export const updateChannelData = async (channelId,newData) => {
  const response = await fetch(`${baseUrl}/${channelId}`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json',
      'X-Admin':''
    },
    'body':JSON.stringify(newData)
  })
  const data = await response.json()
  return data
}

export const createChannelPost = async (channelId, newPost) => {
  const channelData = await getChannelData(channelId)
  const currentPosts = channelData.posts
  const response = await fetch(`${baseUrl}/${channelId}`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json',
      'X-Admin':''
    },
    'body':JSON.stringify({posts: [...currentPosts,newPost]})
  })
}
