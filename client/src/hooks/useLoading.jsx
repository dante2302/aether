import { useState } from "react"
import { ClipLoader } from "react-spinners"

const useLoading = (callback, errorCallback) => {
  const [isLoading,setLoading] = useState(false)

  const callbackWithLoading = async (...args) => {
    try{
      setLoading(true)
      await callback(...args) 
    }
    catch(error){
      if(errorCallback)errorCallback(error)
    }
    finally{
      setLoading(false)
    }
  }

  const loadingSpinner = ({size}) => {
    return isLoading ? <ClipLoader size={size} /> : null
  }

  return [loadingSpinner,callbackWithLoading,isLoading]
}

export default useLoading