
export const changeHandler = (e,setFormState,setErrorState) => {
  e.preventDefault()

  setFormState(state => ({
    ...state,[e.target.name]:`${e.target.value}`
  }))
  if(setErrorState){
    setErrorState(state => ({
      ...state,[e.target.name]:''
    }))
  }
}

export const validateEmail = (email) => { 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailErrorMessage = 'Invalid Email'
  if(emailRegex.test(email)) return ''
  return emailErrorMessage

    //  Valid emails consist of : 
    // - Atleast one character before @
    // - One @ symbol
    // - Atleast one character after @
    // - Atleast one .
    // - Atleast one character after .
}

export const validateUsername = (username) => {
    const usernameRegex = /^[a-z0-9_.]{3,20}$/
    const usernameErrorMessage = 'Usernames must be composed of 3-20 characters and should only contain: Lowercase Letters(a-z), Numbers(0-9), Dots(.) and Underscores(_)'
    if(usernameRegex.test(username)) return ''
    return usernameErrorMessage
}

      //  Usernames can only have: 
      // - Lowercase Letters (a-z) 
      // - Numbers (0-9)
      // - Dots (.)
      // - Underscores (_)
      // - Length is between 3 and 20

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{7,16}$/ 
  const passwordErrorMessage = 'Passwords must be between 7-16 characters and must contain 1 Uppercase Letter (A-Z), 1 Lowercase Letter (a-z)'
  if(passwordRegex.test(password)) return ''
  return passwordErrorMessage

    // Password must have: 
    // - 1 Uppercase Letter (a-z)
    // - 1 Lowercase Letter (a-z)
    // - 7-16 characters
}

