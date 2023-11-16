const baseUrl = 'http://localhost:3030/users';
const dataUrl = 'http://localhost:3030/jsonstore/userData';

export const logIn = async (email,password) => {
  console.log(email,password)
  try{
    let response = await fetch(`${baseUrl}/login`,{
      'method':'POST',
      'body': JSON.stringify({
        email,
        password
    })})
    // if(!response.ok){
    //   throw(new Error())
    // }
    let data = await response.json()
    console.log(data)
    return data
  }
  catch(err){
    alert(err)
  }
}

export const signUp = async (email,password) => {
  try{
    const response = await fetch(`${baseUrl}/register`,{
      'method': 'POST',
      'body': JSON.stringify({
        email,
        password
      })})
    let data = await response.json()
    createUserData(data._id)
  }
  catch(error){
    alert(error)
  }
}

const createUserData = async (_id) => {
   const response = await fetch(`${dataUrl}`,{
   'method': 'POST',
   'body':JSON.stringify({
    user:_id,
    posts:[],
    channels:[],
    savedPosts:[],
    likedPosts:[],
    comments:[],
    socialLinks:[]
   }),
  'mode':'cors'
  })  
  console.log(await response.json())
}
//
// const updateUserData = () => {
//   
// }
