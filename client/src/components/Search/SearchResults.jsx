import { useLocation, useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react'

const SearchResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [results,setResults] = useState()
  useEffect(() => {
  if(location.state){
    console.log(location.state.results)
      setResults(location.state.results)}
  }, [])
  return(
        !results ||
        (results.channelResults.length == 0 
        && results.postResults.length == 0 )
      ? 
      <div>
        <img src='./images/noresults.svg' />
        <h1>Hmm. we couldn't find any results.</h1>
        <h6>Double-check your spelling or try different keywords.</h6>
      </div>
      :
    <div>
      {results.channelResults.length > 0 &&
        <div>
        </div>
      }
      {results.postResults.length > 0 &&
        <div>
        </div>
      }
    </div>
  )
}
export default SearchResults
