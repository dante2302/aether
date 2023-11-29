const baseUrl = 'http://localhost:3030/data/posts'
import {getUserDataByProp} from './userApi.js'
import { equalSign, inEncodedQuotes } from '../utils/encodeUtils.js'
import { updateChannelData, createChannelPost } from './channelApi.js'
export const createPost = async ({username,accessToken},{title,text,imgUrl,channelId}) => {

  try{
    let response = await fetch(`${baseUrl}`,{
      'method': 'POST',
      'headers':{
        'Content-Type': 'application/json',
        'X-Authorization': accessToken
      },
      'body':JSON.stringify({
        channelId,
        ownerUsername:username,
        title,
        text,
        imgUrl,
        likesCount:0,
        comments:[],
        usersCommented:[],
      }),
      'mode': 'cors'
    })

    let data = await response
    data = await data.json() 
    await createChannelPost(channelId,data._id)
    return data
  }
  catch(error){
    alert(error)
  }
}
    
export const getPostData = async (postId) => {
  try{
    const response = await fetch(`${baseUrl}/${postId}`,{'method': 'GET'})
    return response.json()
  }
  catch(error){
   alert(error) 
  }
}

export const getPersonalPosts = async(postId,userId) => {
  const url = `${baseUrl}/${postId}?where=_ownerId${userId}`
  try{
    const response = await fetch(url,{'method': 'GET'})
    return response.json()
  }
  catch(error){
   alert(error) 
  }
}

export const deletePost = async (accessToken,postId) => {
  try{
    let response = await fetch(`${baseUrl}/${postId}`,{
      'method': 'DELETE',
      'headers':{'X-Authorization': accessToken},
    })
    return response.json()
  }
  catch{
    alert(error)
  }
}

export const updatePostData = async (_id,newData) => {
  let response = await fetch(`${baseUrl}/${_id}`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json',
      'X-Admin':''
    },
    'body':JSON.stringify(newData)
  })
}

export const getPostUsername = async (userId) => {
  let data = await getPostDataByProp('_ownerId',userId)
  return data.username 
}

