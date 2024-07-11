// const API_KEY = 'bc6ea2441d1823ef0959f759e1223a1f'
const API_KEY = "";
const apiUrl = 'https://api.linkpreview.net'

export const getLinkData = async (link) => {
  const headers ={
      'X-Linkpreview-Api-Key':API_KEY
  }
  if(link[link.length - 1] == "/")
    link = link.slice(0, link.length - 1);
  const response = await fetch(apiUrl,{
    method:'POST',
    headers,
    body: JSON.stringify({q:link})
  })
  if(response.status != 200)return null
  let data = await response.json()
  return data 
} 


