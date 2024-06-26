const baseUrl = 'http://localhost:3030/data/posts'

import * as request from './request.js'

export const createPost = async ({accessToken},formData) => {
  const { channelId } = formData
    const bodyData = {
        ...formData,
        channelId
      }
    const data = await request.post({url: baseUrl,accessToken,bodyData})
    return data
}    

export const getPostData = async (id) => {
  const url = `${baseUrl}/${id}`
  const data = await request.get(url)
  return data
}

export const getPopularPosts = async (limit, offset) => 
  await request.get(`${baseUrl}/popular?limit=${limit}&offset=${offset}`)

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
