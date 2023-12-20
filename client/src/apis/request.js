
import { equalSign, inEncodedQuotes } from '../utils/encodeUtils.js'

export const post = async ({url,accessToken,bodyData}) => {
    const response = await fetch(url,{
      method: 'POST',
      headers:{
        'X-Authorization': accessToken,
        'Content-Type':'application/json'
      },
      body: JSON.stringify(bodyData),
      mode: 'cors'
    })
    const data = await response.json()
    return data
}

export const get = async (url) => {
    const response = await fetch(url,{method: 'GET',mode:'cors'})
    const data = await response.json()
    return data
}

export const search = async ({url,prop,value}) => {
  const searchParam = `${prop}${equalSign}${inEncodedQuotes(value)}`
  const searchUrl = `${url}?where=${searchParam}`
  const response = await fetch(searchUrl,{method: 'GET'})
  const data = await response.json()
  return data
}

export const searchContent = async ({url,prop,value,pageSize,offset}) => {
  const searchParam = `${prop}LIKE${inEncodedQuotes(value)}`
  const searchUrl = `${url}?pageSize=${pageSize}&offset=${offset}?where=${searchParam}`
  const response = await fetch(searchUrl,{method: 'GET'})
  const data = await response.json()
  return data
}

export const searchWithUnion = async ({url,firstProp,firstValue,secondProp,secondValue}) => {
  const encodeFirst = (typeof(firstValue) === 'string')
  const encodeSecond = (typeof(secondValue) === 'string')
  const firstParam = `${firstProp}${equalSign}${encodeFirst ? inEncodedQuotes(firstValue) : firstValue}`
  const secondParam = `${secondProp}${equalSign}${encodeSecond ? inEncodedQuotes(secondValue): secondValue}`
  const searchUrl = `${url}?where=${firstParam} AND ${secondParam}`

  const response = await fetch(searchUrl, {method: 'GET'})
  const data = await response.json()
  return data
}

export const searchContentWithUnion = async ({url,firstProp,secondProp,value,offset}) => {
  const firstParam = `${firstProp} LIKE ${inEncodedQuotes(value)}`
  const secondParam = `${secondProp} LIKE ${inEncodedQuotes(value)}`
  const searchUrl = `${url}?pageSize=1&offset=${offset}?where=${firstParam} OR ${secondParam}`
  const response = await fetch(searchUrl,{method: 'GET'})
  return await response.json()
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

export const Delete = async ({url,accessToken}) => {
  let response = await fetch(url,{
    'method': 'DELETE',
    'headers':{'X-Authorization': accessToken},
  })
  return response.json()
}
