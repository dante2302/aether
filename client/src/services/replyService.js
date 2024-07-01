const baseUrl = 'http://localhost:5155/replies'
const commentUrl = "http://localhost:5155/comments";

import * as request from './request.js'

export const createReply = async (userData,{parentCommentId,replyToComment,text}) => {
  const bodyData = {
    ownerId: userData.id,
    parentCommentId,
    replyToComment,
    text,
  }

  console.log(bodyData);
  const response = await request.post({
    url:baseUrl, 
    accessToken: userData.accessToken, 
    bodyData
  }) 
  return response
}

export const getCommentReplies = async (commentId) => {
  return await request.get(`${commentUrl}/${commentId}/replies`)
}

export const updateReply = async ({accessToken},commentId,newData) => {
  const data = await request.patchWithAuth({
    url:`${baseUrl}/${commentId}`,
    accessToken,
    newData
  }) 
  return data
}

export const deleteReply = async ({accessToken},id) => {
  const url = `${baseUrl}/${id}`
  await request.Delete({url,accessToken})
}