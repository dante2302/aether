const baseUrl = "http://localhost:5155/users"
import * as request from "./request";
export const getUserDataByProp = async (prop,value) => {
  const data = await request.search({url:dataUrl,prop,value})
  return data[0]
}

export async function getUserChannels(userId)
{
  const response = await request.get(`${baseUrl}/${userId}/channels`)
  return response;
}
export const updateUserData = async (userData,newData) => {
  const url = `${dataUrl}/${userData._id}`
  const data = await request.patchWithAuth({url, accessToken:userData.accessToken, newData})
  return {...userData,...data}
}

