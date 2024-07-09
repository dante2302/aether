const baseUrl = 'http://localhost:5155/comments'
const postUrl = "http://localhost:5155/posts"

import * as request from './request.js'

export const createComment = async (userData,{postId,text}) => {
  const bodyData = {
    ownerId: userData.id,
    postId,
    text,
  }

  const response = await request.post({
    url:baseUrl, 
    accessToken: userData.accessToken, 
    bodyData
  }) 
  return response
}

export async function getPostComments(postId){
  return await request.get(`${postUrl}/${postId}/comments`)
}

export const getCommentData = async (commentId) => {
  const data = await request.get(`${baseUrl}/${commentId}`)
  return data
}

export const updateComment = async ({accessToken},commentId,newData) => {
}

export const deleteComment = async (accessToken,id) => {
  const url = `${baseUrl}/${id}`
  return await request.Delete({url,accessToken})
}