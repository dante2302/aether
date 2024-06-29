
const baseUrl = 'http://localhost:3030/data/comments'
import * as request from './request.js'
import { updateUserData } from './userService.js'

export const createComment = async (userData,{replyTo,parentCommentId,postId,text}) => {
  const bodyData = {
    postId,
    text,
    edited:false,
  }
  const data = await request.post({url:baseUrl, accessToken: userData.accessToken, bodyData}) 
  const a = await updateUserData(userData,{comments:[...userData.comments,data._id]})
  return data
}

export const getPostComments = async (postId) => {
  const data = await request.searchWithUnion({
    url:baseUrl,
    firstProp:'postId',
    firstValue:postId,
    secondProp:'replyTo',
    secondValue: ''
  })  
  return data
}

export const getCommentReplies = async (commentId) => {
  const data = await request.search({
    url:baseUrl,
    prop:'parentCommentId',
    value:commentId
  });
  return data
}

export const getCommentData = async (commentId) => {
  const data = await request.get(`${baseUrl}/${commentId}`)
  return data
}

export const updateCommentData = async ({accessToken},commentId,newData) => {
  const data = await request.patchWithAuth({
    url:`${baseUrl}/${commentId}`,
    accessToken,
    newData
  }) 
  return data
}

export const deleteComment = async ({accessToken},id) => {
  const url = `${baseUrl}/${id}`
  await request.Delete({url,accessToken})
}

