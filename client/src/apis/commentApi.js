
const baseUrl = 'http://localhost:3030/data/comments'
import * as request from './request.js'
import { updateUserData } from './userApi.js'

export const createComment = async (userData,{replyTo,parentCommentId,postId,text}) => {
  console.log(userData.accessToken)
  const bodyData = {
    postId,
    text,
    edited:false,
    parentCommentId,
    replyTo,
    ownerUsername:userData.username
  }
  const data = await request.post({url:baseUrl, accessToken: userData.accessToken, bodyData}) 
  const a = await updateUserData(userData,{comments:[...userData.comments,data._id]})
  console.log(a)
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
  console.log(accessToken)
  const url = `${baseUrl}/${id}`
  const data = await request.Delete({url,accessToken})
}

