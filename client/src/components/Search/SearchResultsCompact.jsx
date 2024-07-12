import { memo } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./styles/SearchResultsCompact.module.css";

const SearchResulstCompact = memo(({results}) => {
  const navigate = useNavigate();
  return (
      results && results.length > 0 &&
        <ul className={styles['result-list']}>
          {results.map((channelData) =>
            <li
              key={`${channelData.id}res`}
              onClick={() => navigate(`/c/${channelData.name}`)}
              className={styles['result']}
            >
              <h6>c/{channelData.name}</h6>
            </li>)}
        </ul>
      
  )
})

export default SearchResulstCompact