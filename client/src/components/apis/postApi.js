const baseUrl = 'http://localhost:3030/data/posts'

export const createPost = async ({accessToken,_id},{title,text}) => {
  try{
    let response = await fetch(`${baseUrl}`,{
      'method': 'POST',
      'headers':{
        'Content-Type': 'application/json',
        'X-Authorization': accessToken
      },
      'body':JSON.stringify({
        title,
        text,
        creator:_id,
        likesCount:0,
        usersLiked:[],
        comments:[],
        usersCommented:[],
      }),
      'mode': 'cors'
    })
    const data = await response
    return data.json() 
  }
  catch(error){
    alert(error)
  }
}

export const getPost = async () => {
  try{
    const response = await fetch(baseUrl,{'method': 'GET'})
    return response.json() 
  }
  catch(error){
   alert(erorr) 
  }
}

export const deletePost = async (accessToken,postId) => {
  try{
    let response = await fetch(`${baseUrl}/${postId}`,{
      'method': 'DELETE',
      'headers':{'X-Authorization': accessToken},
    })
    return response.json()
  }
  catch{
    alert(error)
  }
}
