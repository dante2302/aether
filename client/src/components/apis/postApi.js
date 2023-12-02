const baseUrl = 'http://localhost:3030/data/posts'

import {getUserDataByProp} from './userApi.js'
import { updateChannelData, createChannelPost } from './channelApi.js'
import * as request from './request.js'
import { inEncodedQuotes } from '../utils/encodeUtils.js'

export const createPost = async ({username,accessToken},{title,text,imgUrl,channelId}) => {
  try{
    const bodyData = {
        channelId,
        ownerUsername:username,
        title,
        text,
        imgUrl,
        linkUrl,
        likesCount:0,
        comments:[],
        usersCommented:[],
      }
    const data = await request.post({url: baseUrl,accessToken,bodyData})
    await createChannelPost(channelId,data._id)
    return data
  }
  catch(error){
    alert(error)
  }
}    

export const getPostData = async (postId) => {
  const url = `${baseUrl}/${postId}`
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

// export const deletePost = async (accessToken,postId) => {
//   try{
//     let response = await fetch(`${baseUrl}/${postId}`,{
//       'method': 'DELETE',
//       'headers':{'X-Authorization': accessToken},
//     })
//     return response.json()
//   }
//   catch{
//     alert(error)
//   }
// }

export const updatePostData = async (_id,newData) => {
  console.log(newData)
  const url = `${baseUrl}/${_id}`
  const data = await request.patchWithoutAuth({url,newData})
  console.log(data)
  return data
}

export const searchPosts = async (value,pageSize,offset) => {
  const data = await request.search({url:baseUrl,prop:'title',value,pageSize,offset})
  return data
}
