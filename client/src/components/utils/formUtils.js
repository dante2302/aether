
export const changeHandler = (e,setFormState) => {
  e.preventDefault()
  setFormState(state => ({
    ...state,[e.target.name]:`${e.target.value}`
  }))
}

