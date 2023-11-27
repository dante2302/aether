const baseUrl = 'http://localhost:3030/data/channels'
import {equalSign, quotationMark} from '../utils/encodeUtils.js'

export const createChannel = async ({accessToken,_ownerId,channels},{name,description}) => {
  try{
    let response = await fetch(`${baseUrl}`,{
      'method': 'POST',
      'headers':{
        'Content-Type': 'application/json',
        'X-Authorization': accessToken
      },
      'body':JSON.stringify({
        name,
        description,
        members:[userId],
        posts:[]
      }),
      'mode': 'cors'
    })
    const data = await response.json()
    updateUserData({userId,accessToken},{channels: [...channels,data._id]})
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
  const response = await fetch(`${baseUrl}?count`,{
    method: 'GET'
  })
  return await response.json()
}

export const getChannelDataByProp = async (prop,value) => {
  const response = await fetch(
    `${baseUrl}?where=${prop}${equalSign}${quotationMark}${value}${quotationMark}`,{
      method: 'GET'
  })
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
