
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"

const useLoading = (callback,size) => {
  const [isLoading,setLoading] = useState(false)
  const [spinner,setSpinner] = useState(<ClipLoader size={size} />)

  // useEffect(() => { 
  //   isLoading 
  //     ? 
  //     setSpinner()
  //     :
  //     setSpinner(<></>)
  // }, [isLoading])
  //
  const callbackWithLoading = async (...args) => {
    setLoading(true)
    await callback(...args) 
    setLoading(false)
  }

  return [spinner,callbackWithLoading]
}

export default useLoading

