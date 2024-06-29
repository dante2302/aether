const baseUrl = 'http://localhost:5155/posts'

import { getChannelName } from './channelService.js'
import * as request from './request.js'
import { getUsername } from './userService.js'

export const createPost = async (userData,formData) => {
  const { channelId } = formData
    const bodyData = {
        ...formData,
        channelId,
        ownerId: userData.id
      }
    const data = await request.post({url: baseUrl,accessToken: userData.accessToken,bodyData})
    return data
}    

export const getPostData = async (id) => {
  const url = `${baseUrl}/${id}`
  const data = await request.get(url)
  return data
}

export const getAdditionalPostData = async (postData) => 
{
  const commentCount = await (await getCommentCount(postData.id)).json();
  const likesCount = await (await getLikesCount(postData.id)).json();
  const dislikesCount = await (await getDislikesCount(postData.id)).json();
  const ownerUsername = await (await getUsername(postData.ownerId)).json();
  const channelName = await (await getChannelName(postData.channelId)).json();

  return {
    commentCount,
    likesCount,
    dislikesCount,
    ownerUsername,
    channelName
  }
}

export const getPopularPosts = async (limit, offset) => 
  await request.get(
    `${baseUrl}/popular?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`)

export const getPostDataByProp = async (prop,value) => {
  const data = await request.search({url:baseUrl,prop,value})
  return data
}

export async function getCommentCount(postId)
{
  const response = await request.get(`${baseUrl}/${postId}/commentCount`)
  return response;
}

export async function getLikesCount(postId)
{

  return await request.get(`${baseUrl}/${postId}/likesCount`)
}

export async function getDislikesCount(postId)
{
  return await request.get(`${baseUrl}/${postId}/dislikesCount`)
}


export const getPersonalPosts = async(postId,userId) => {
  const data = await request.search({url:`${baseUrl}/${postId}`, prop:'_ownerId', value:userId})
  return data
}

export const updatePostData = async (id,newData) => {
  const url = `${baseUrl}/${id}`
  const data = await request.patchWithoutAuth({url,newData})
  return data
}

export const searchPosts = async (value,pageSize,offset) => {
  const data = await request.search({url:baseUrl,prop:'title',value,pageSize,offset})
  return data
}

export const deletePost = async (accessToken,id) => {
  const url = `${baseUrl}/${_id}`
  const data = await request.Delete({url,accessToken})
  return data
}
