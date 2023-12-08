const baseUrl = 'http://localhost:3030/data/popular'
import * as request from './request.js'

export const getPopularChannels = async () => {
  const data = await request.get(`${baseUrl}Channels`) 
  return getPopularArray(data)
}

export const getPopularPosts = async () => {
  const data = await request.get(`${baseUrl}Posts`)
  return getPopularArray(data)
}

export const getPopularArray = (objectArray) => {
  return objectArray.map((object) => object._id)
}


