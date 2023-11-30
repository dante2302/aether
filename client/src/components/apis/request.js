
import { equalSign, inEncodedQuotes } from '../utils/encodeUtils.js'

export const post = async ({url,accessToken,bodyData}) => {
  try{
    const response = await fetch(url,{
      method: 'POST',
      headers:{
        'X-Authorization': accessToken,
        'Content-Type':'application/json'
      },
      body: JSON.stringify(bodyData),
      mode: 'cors'
    })
    let data = await response.json()
  }
  catch(err){
    console.log(err)
  }
}

export const get = async (url) => {
  try{
    const response = await fetch(url,{method: 'GET',mode:'cors'})
    const data = await response.json()
    return data
  }
  catch(err){

  }

}

export const search = async ({url,prop,value}) => {
  const searchParam = `${prop}${equalSign}${inEncodedQuotes(value)}`
  const searchUrl = `${url}?where=${searchParam}`
  const response = await fetch(searchUrl,{method: 'GET'})
  const data = await response.json()
  return data[0]
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

export const patchWithoutAuth = async ({url,newData}) => {
  let response = await fetch(url,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json',
      'X-Admin':''
    },
    'body':JSON.stringify(newData)
  })
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

