
const baseUrl = 'http://localhost:5155/channels'
import * as request from './request.js'

export const createChannel = async (userData,{name,description}) => {
  const bodyData = {
    name,
    description,
    ownerId: userData.id
  }

  const result = await request.post({
    url:baseUrl,
    accessToken:userData.accessToken,
    bodyData
  })
  return result;
}

export async function isJoinedBy(channelId, userId) 
{
  return await request.get(`${baseUrl}/${channelId}/isjoinedby/${userId}`);
}

export async function joinChannel(channelId, userData)
{
  return await request.post({
    url: `${baseUrl}/${channelId}/join`, 
    accessToken: userData.accessToken,
    bodyData: userData.id});
}

export async function leaveChannel(channelId, userData)
{
  return await request.Delete({
    url: `${baseUrl}/${channelId}/leave`, 
    accessToken: userData.accessToken,
    bodyData: userData.id});
}

export const getChannelData = async (channelId) =>
  await request.get(`${baseUrl}/${channelId}`)

export const getChannelDataByName = async (name) =>
  await request.get(`${baseUrl}/${encodeURIComponent(name)}`)

export const getPopularChannels = async () =>
  await request.get(`${baseUrl}/popular`)

export const getMemberCount = async (id) =>
  await request.get(`${baseUrl}/${id}/membercount`)

export const getChannelName = async (id) =>
  await request.get(`${baseUrl}/${id}/name`)

export async function getChannelPosts(channelId, limit, offset)
{
  var a = await request.get(`${baseUrl}/${channelId}/posts?limit=${limit}&offset=${offset}`)
  return a;
}
export const updateChannelData = async (channelId,newData) => {
  const url = `${baseUrl}/${channelId}`
  const data = await request.patchWithoutAuth({url,newData})
  return data
}

export const searchChannels = async (value,pageSize,offset) => {
  const data = await request.search({url:baseUrl,prop:'name',value,pageSize:5,offset:0})
  return data  
}
