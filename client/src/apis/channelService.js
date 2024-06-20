
const baseUrl = 'http://localhost:5155/channels'
import * as request from './request.js'

export const createChannel = async (userData,{name,description}) => {
  const bodyData = {
    name,
    description,
    ownerId: userData.Id
  }

  const result = await request.post({
    url:baseUrl,
    accessToken:userData.accessToken,
    bodyData
  })

  return result;
}


export const getChannelData = async (channelId) => {
  const data = await request.get(`${baseUrl}/${channelId}`)
  return data
}


export const getChannelDataByName = async (name) => {
  const response = await request.get(`${baseUrl}/${encodeURIComponent(name)}`)
  return response;
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
