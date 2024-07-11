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

export const put = async (url, accessToken, updatedData) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(updatedData)
  })
  return response;
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