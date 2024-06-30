export const post = async ({url,accessToken,bodyData}) => {
    const response = await fetch(url,{
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify(bodyData),
      mode: 'cors'
    })
    return response;
}

export const get = async (url, accessToken) => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  return response
}

export const search = async ({url,prop,value}) => {
  const response = await fetch(
    `${url}?${encodeURIComponent(prop)}=${encodeURIComponent(value)}`,
    {method: 'GET'}
  )
  return response;
}

export const patchWithoutAuth = async ({url,newData}) => {
  let response = await fetch(url,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json',
      'X-Admin':''
    },
    'body':JSON.stringify(newData)
  })
  return await response.json()
}

export const patchWithAuth = async ({url,accessToken,newData}) => {
  const response = await fetch(url,{
    method:'PATCH',
    headers:{
      'X-Authorization': accessToken,
      'Content-Type':'application/json'
    },
   body:JSON.stringify(newData)
  })
  return await response.json()
}

export const Delete = async ({url,accessToken, bodyData}) => {
  let response = await fetch(url,{
    'method': 'DELETE',
    'headers':{
      'Authorization': `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyData)
  })
  return response
}