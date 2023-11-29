const baseUrl = 'http://localhost:3030/data/comments'

import { equalSign, inEncodedQuotes, whiteSpace } from '../utils/encodeUtils.js'
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
  const postParam = `postId${equalSign}${postId}`
  const replyParam = `replyTo${equalSign}${inEncodedQuotes('')}`
  const url = `${baseUrl}?where=${postParam} AND ${replyParam}`

  let response = await fetch(url, {method: 'GET'})
  let data = await response.json()

  return data
}

export const getCommentReplies = async (commentId,pageSize,offset) => {
  const parentCommentParam = `parentCommentId${equalSign}${inEncodedQuotes(commentId)}`
  const url = `${baseUrl}?where=${parentCommentParam}`

  let response = await fetch(url,{method: 'GET'})
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
