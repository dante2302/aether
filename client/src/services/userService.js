const baseUrl = "http://localhost:5155/users"
import * as request from "./request";
export const getUserDataByProp = async (prop,value) => {
  const data = await request.search({url:dataUrl,prop,value})
  return data[0]
}

export async function getRelatedChannels(userData)
{
  const response = await request.get(
    `${baseUrl}/${userData.id}/related/channels`,
    userData.accessToken
  )
  return response;
}

export const getUsername = async (id) =>
  await request.get(`${baseUrl}/${id}/username`)

export async function getRelatedPosts(userData, limit, offset)
{
  const response = await request.get(
    encodeURI(`${baseUrl}/${userData.id}/related/posts?limit=${limit}&offset=${offset}`),
    userData.accessToken
  );
  return response;
}

export const updateUserData = async (userData,newData) => {
  const url = `${dataUrl}/${userData._id}`
  const data = await request.patchWithAuth({url, accessToken:userData.accessToken, newData})
  return {...userData,...data}
}

