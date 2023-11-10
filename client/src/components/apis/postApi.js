const baseUrl = 'http://localhost:3030/data/:popular'

export const createPost = async (accessToken, setPosts) => {
  try{
    let response = await fetch(baseUrl,{
      },
        'body':JSON.stringify({
        'heading':'My Post',
        'description': 'Descr',
        'img': 'img.src'
      }),
      'mode': 'cors'
    })
    const data = await response.json()
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
