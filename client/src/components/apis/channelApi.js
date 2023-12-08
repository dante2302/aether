
const baseUrl = 'http://localhost:3030/data/channels'
import * as request from './request.js'
import {updateUserData} from './userApi.js'

export const createChannel = async (userData,{name,description}) => {
  const bodyData = {
    name,
    description,
    members:[userData._ownerId],
    posts:[]
  }
  const data = await request.post({
    url:baseUrl,
    accessToken:userData.accessToken,
    bodyData
  })

  const a = await updateUserData(userData,{
    channels: [...userData.channels,data._id], 
    authorChannels: [...userData.authorChannels, data._id]
  })

  return [data,a]
}


export const getChannelData = async (channelId) => {
  const data = await request.get(`${baseUrl}/${channelId}`)
  return data
}


export const getChannelDataByProp = async (prop,value) => {
  const data = await request.search({url:baseUrl,prop,value})
  return data[0]
}

export const updateChannelData = async (channelId,newData) => {
  const url = `${baseUrl}/${channelId}`
  const data = await request.patchWithoutAuth({url,newData})
  return data
}

export const createChannelPost = async (channelId, newPost) => {
  const channelData = await getChannelData(channelId)
  const currentPosts = channelData.posts
  const newData = {posts:[...currentPosts,newPost]}

  const url = `${baseUrl}/${channelId}`
  const data = await request.patchWithoutAuth({url,newData})
  return data
}

export const searchChannels = async (value,pageSize,offset) => {
  const data = await request.search({url:baseUrl,prop:'name',value,pageSize:5,offset:0})
  return data  
}
