const API_KEY = 'd4222883ed666108e29cfc1520ed2eca'
const apiUrl = 'https://api.linkpreview.net'

export const getLinkData = async (link) => {
  const response = await fetch(apiUrl,{
    method:'POST',
    headers:{
      'X-Linkpreview-Api-Key':API_KEY
    },
    mode: 'cors',
    body: JSON.stringify({q:link})
  })
  let data = await response.json()
  if(response.status != 200)return null
  return data 
} 


