export const getUserDataByProp = async (prop,value) => {
  const data = await request.search({url:dataUrl,prop,value})
  return data[0]
}

export const updateUserData = async (userData,newData) => {
  const url = `${dataUrl}/${userData._id}`
  const data = await request.patchWithAuth({url, accessToken:userData.accessToken, newData})
  return {...userData,...data}
}

