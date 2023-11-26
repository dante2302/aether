const baseUrl = 'http://localhost:3030/data/comments'

export const createComment = async ({accessToken},{text,repliedUserId,parentComment}) => {
  try{
    let response = await fetch(`${baseUrl}`,{
      'method': 'POST',
      'headers':{
        'Content-Type': 'application/json',
        'X-Authorization': accessToken
      },
      'body':JSON.stringify({
        text,
        replyTo:repliedUserId,
        parentComment,
      })
}

export const deleteComment = async () => {

}

export const updateComment = async () => {

}
