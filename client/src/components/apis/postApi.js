const baseUrl = 'http://localhost:3030/data/posts'
const popularUrl = 'http://localhost:3030/data/popularPosts'
import {getUserDataProp} from './userApi.js'
import {equalSign, quotationMark} from '../utils/encodeUtils.js'

export const createPost = async ({accessToken},{title,text,imgUrl}) => {
  try{
    let response = await fetch(`${baseUrl}`,{
      'method': 'POST',
      'headers':{
        'Content-Type': 'application/json',
        'X-Authorization': accessToken
      },
      'body':JSON.stringify({
        channel:
        title,
        text,
        likesCount:0,
        usersLiked:[],
        usersDisliked:[],
        comments:[],
        usersCommented:[],
      }),
      'mode': 'cors'
    })
    const data = await response
    return data.json() 
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
  try{
    const response = await fetch(`${baseUrl}/${postId}?where=_ownerId${userId}`,{'method': 'GET'})
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

export const getPostUsername = async (userId) => {
  return await getUserDataProp(userId,'username')
}

