const baseUrl = 'http://localhost:3030/data/posts'

import { createChannelPost } from './channelApi.js'
import * as request from './request.js'

export const createPost = async ({username,accessToken},formData) => {
  const { channelId } = formData
    const bodyData = {
        ...formData,
        ownerUsername:username,
        likesCount:0,
        comments:[],
        usersCommented:[],
      }
    const data = await request.post({url: baseUrl,accessToken,bodyData})
    await createChannelPost(channelId,data._id)
    return data
}    

export const getPostData = async (id) => {
  const url = `${baseUrl}/${id}`
  const data = await request.get(url)
  return data
}

export const getPostDataByProp = async (prop,value) => {
  const data = await request.search({url:baseUrl,prop,value})
  return data
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
