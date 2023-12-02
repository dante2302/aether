import { useLocation, useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react'

const SearchResults = () => {
  const location = useLocation()
  let results = location.state

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
      <ul>

        {results.channelResults.map((resultData) => 
          <li>
          <div>
            <h1>c/{resultData.name}</h1>
          </div>
          </li>
          )
        }

        {results.postResults.map((resultData) => 
          <li>
          <div>
            <h1>{resultData.title}</h1>
          </div>
          </li>)
        }
      </ul>
  )
}
export default SearchResults
