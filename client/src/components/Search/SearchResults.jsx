import { useLocation, useNavigate } from "react-router-dom"

const SearchResults = () => {
  const location = useLocation()
  const navigate = useNavigate();
  let results = location.state
  return(
      !results ||
      results.length == 0 
      ? 
      <div>
        <img src='./images/noresults.svg' />
        <h1>Hmm. we couldn't find any results.</h1>
        <h6>Double-check your spelling or try different keywords.</h6>
      </div>
      :
      <ul>
        {results.map((resultData) => 
          <li 
            key={resultData.id}
            onClick={() => navigate(`/c/${resultData.name}`)}
          >
          <div>
            <h1>c/{resultData.name}</h1>
          </div>
          </li>
          )
        }
      </ul>
  )
}
export default SearchResults
