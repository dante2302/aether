const baseUrl = 'http://localhost:3030/data/comments'

import { equalSign } from '../utils/encodeUtils.js'
import { inEncodedQuotes } from  '../utils/encodeUtils.js'

export const createComment = async ({accessToken,username},{replyTo,parentCommentId,postId,text}) => {
    let response = await fetch(baseUrl,{
      'method': 'POST',
      'headers':{
        'Content-Type': 'application/json',
        'X-Authorization': accessToken
      },
      'body':JSON.stringify({
        postId,
        text,
        edited:false,
        parentCommentId,
        replyTo,
        ownerUsername:username
      })
    })
    const data = await response.json()
    return data
}

export const getPostComments = async (postId) => {
  let a = inEncodedQuotes("")
  let response = await fetch(`
      ${baseUrl}?where=postId${equalSign}${inEncodedQuotes(postId)} AND replyTo${equalSign}${'%22%22'}`
    ,{method: 'GET'})
  let data = await response.json()
  console.log(data)
  data = data.filter((comment) => comment.parentCommentId === '' )
  return data
}

export const getCommentReplies = async (commentId,pageSize,offset) => {
  let response = await fetch(
    `${baseUrl}?where=parentCommentId${equalSign}${inEncodedQuotes(commentId)}`
      // &offset=${offset}&pageSize=${pageSize}`
    ,{method: 'GET'})
  const data = await response.json()
  return data
}

export const getCommentData = async (commentId) => {
  let response = await fetch(`${baseUrl}/${commentId}`)
  return await response.json()
}
export const updateComment = async () => {
  
}

export const deleteComment = async () => {

}

export const getReply = async () => {

}

export const updateReply = async () => {

}

export const deleteReply = async () => {

}
