const API_KEY = 'bc6ea2441d1823ef0959f759e1223a1f'
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
    mode: 'cors',
    body: JSON.stringify({q:link})
  })
  let data = await response.json()
  console.log(data);
  if(response.status != 200)return null
  return data 
} 


