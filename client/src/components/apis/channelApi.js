
const baseUrl = 'http://localhost:3030/data/channels'
import * as request from './request.js'

export const createChannel = async (userData,{name,description}) => {
  const bodyData = {
    name,
    description,
    members:[userData._ownerId],
    posts:[]
  }
  const data = await request.post(baseUrl,userData.accessToken,bodyData)
  updateUserData(userData,{channels: [...userData.channels,data._id]})
  return data
}


export const getChannelData = async (channelId) => {
  const data = await request.read(`${baseUrl}/${channelId}`)
  return data
}


export const getChannelDataByProp = async (prop,value) => {
  const data = await request.search({url:baseUrl,prop,value})
  return data
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
