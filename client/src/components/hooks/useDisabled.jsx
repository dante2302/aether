import { useState } from "react"

const useDisabled = (callback) => {
  const [disabled,setDisabled] = useState()

  const callbackWithDisable = async (...args) => {
    setDisabled(true)
    await callback(...args) 
    setDisabled(false)
  }

  return [disabled,callbackWithDisable]
}

export default useDisabled
