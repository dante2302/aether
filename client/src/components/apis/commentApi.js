
const baseUrl = 'http://localhost:3030/data/comments'

export const createComment = async ({accessToken,username},{replyTo,parentCommentId,postId,text}) => {
  const bodyData = {
    postId,
    text,
    edited:false,
    parentCommentId,
    replyTo,
    ownerUsername:username
  }
  const data = await request.post({url:baseUrl,accesToken,bodyData}) 
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

export const getCommentReplies = async (commentId,pageSize,offset) => {
  const data = await request.search({
    url:baseUrl,
    prop:'parentCommentId',
    value:commentId
  });
  return data
}

export const getCommentData = async (commentId) => {
  const data = await request.read(`${baseUrl}/${commentId}`)
  return data
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
