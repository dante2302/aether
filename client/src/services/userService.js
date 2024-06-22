

export const signUp = async ({email,password,username}) => {
  const bodyData = {
    email,
    password
  }

  const url = `${baseUrl}/register`
    const response = await fetch(
      url,{
      method: 'POST',
      body:JSON.stringify(bodyData)})

    const serverData = await response.json()

    const userData = await createUserData(username,serverData.accessToken)
    return {...serverData,...userData} 
}

export const getUserDataByProp = async (prop,value) => {
  const data = await request.search({url:dataUrl,prop,value})
  return data[0]
}

export const updateUserData = async (userData,newData) => {
  const url = `${dataUrl}/${userData._id}`
  const data = await request.patchWithAuth({url, accessToken:userData.accessToken, newData})
  return {...userData,...data}
}

