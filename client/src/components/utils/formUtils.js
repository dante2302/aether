
export const changeHandler = (e,setFormState) => {
  e.preventDefault()
  setFormState(state => ({
    ...state,[e.target.name]:`${e.target.value}`
  }))
}

const validateEmail = (email) => {
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email)
  
}

const validateUsername = (username) => {
    const usernameRegex = /^[a-z0-9_.]+$/
    return usernameRegex.test(username)
      //  Usernames can only have: 
      // - Lowercase Letters (a-z) 
      // - Numbers (0-9)
      // - Dots (.)
      // - Underscores (_)
}

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{7,16}$/ 
  return passwordRegex.test(password)
}

