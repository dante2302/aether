import { useEffect, useRef } from "react"

const useDebounce = (callback,delay,dependency=[]) => {
  const timeoutRef = useRef(null)

  useEffect(() => {
    return(
      clearTimeout(timeoutRef.current)
    )
  }, [])

  const debounceCallback = (...args) => {
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    },delay)
  }
  return debounceCallback
}

export default useDebounce