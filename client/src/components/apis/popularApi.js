
const baseUrl = 'http://localhost:3030/data/popular'

export const getPopularChannels = async (pageSize) => {
  const response = await fetch(`${baseUrl}Channels`,{method: 'GET'})
  return await response.json()
}

export const getPopularPosts = async () => {
  const response = await fetch(`${baseUrl}Posts`,{method: 'GET'})
  return await response.json()
}

export const getPopularArray = (all) => {
  return Object.values(all).map((object)=>object._id)
}

