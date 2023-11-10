const baseUrl = 'http://localhost:3030/data/communities'

export const createChannel = async ({accessToken,userId,name,description}) => {
  try{
    let response = await fetch(`${baseUrl}`,{
      'method': 'POST',
      'headers':{
        'Content-Type': 'application/json',
        'X-Authorization': accessToken
      },
      'body':JSON.stringify({
        name,
        description,
        members:[],
        memberCount: 1,
        posts:[]
        // recentPosts:[]
      }),
      'mode': 'cors'
    })

    return data.json() 
  }
  catch(error){
    alert(error)
  }
}


