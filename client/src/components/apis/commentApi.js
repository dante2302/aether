
const baseUrl = 'http://localhost:3030/data/comments'
import * as request from './request.js'
import { updatePostData } from './postApi.js'

export const createComment = async ({accessToken,username},{replyTo,parentCommentId,postId,text}) => {
  const bodyData = {
    postId,
    text,
    edited:false,
    parentCommentId,
    replyTo,
    ownerUsername:username
  }
  const data = await request.post({url:baseUrl,accessToken,bodyData}) 
  return data
}

export const getPostComments = async (postId) => {
  try{
    const data = await request.searchWithUnion({
      url:baseUrl,
      firstProp:'postId',
      firstValue:postId,
      secondProp:'replyTo',
      secondValue: ''
    })  
    return data
  }
  catch(err){
    console.log(err)
  }
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

export const deleteComment = async () => {

}

