const baseUrl = 'http://localhost:5155/replies'

import * as request from './request.js'

export const createReply = async (userData,{parentCommentId,replyToComment,text}) => {
  const bodyData = {
    ownerId: userData.id,
    parentCommentId,
    replyToComment,
    text,
  }

  const response = await request.post({
    url:baseUrl, 
    accessToken: userData.accessToken, 
    bodyData
  }) 
  return response
}

export const getCommentReplies = async (commentId) => {
    return await request.get($)
}

export const updateReply = async ({accessToken},commentId,newData) => {
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