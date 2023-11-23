const baseUrl = 'http://localhost:3030/data/channels'
const popularUrl = 'http://localhost:3030/data/popularChannels'
import {equalSign, quotationMark} from '../utils/encodeUtils.js'

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
        members:[userId],
        memberCount: 1,
        posts:[]
      }),
      'mode': 'cors'
    })
    const data = await response
    return data.json() 
  }
  catch(error){
    alert(error)
  }
}

export const updateChannelData = async ({accessToken,userId}) => {
}

const getChannelData = async (channelId) => {
  const response = await fetch(`${baseUrl}/${channelId}`,{method: 'GET'}) 
  return await response.json()
}

const getChannelCount = async () => {
  const response = await fetch(`${baseUrl}?count`,{
    method: 'GET'
  })
  return await response.json()
}

export const getChannelDataByName = async (name) => {
  const response = await fetch(
    `${baseUrl}?where${equalSign}name${equalSign}${quotationMark}${name}${quotationMark}`,{
      method: 'GET'
    })
  const data = await response.json()
  return data[0]
}

export const getPopularChannels = async (pageSize) => {
  const response = await fetch(`${popularUrl}`,{method: 'GET'})
  return await response.json()
}

export const getPostsByPage = () => {

}
