
export const changeHandler = (e,setFormState) => {
  e.preventDefault()
  setFormState(state => ({
    ...state,[e.target.name]:`${e.target.value}`
  }))
}

export const validateEmail = () => {

}

export const validateUsername = () => {

}

export const validatePassword = () => {

}

