import SearchResultsCompact from './SearchResultsCompact'

import search from './search.js'
import useDebounce from '../hooks/useDebounce.jsx'

import { useState, useEffect } from 'react'

import styles from '../NavBar/Navbar.module.css'
import  UilSearch from '@iconscout/react-unicons/icons/uil-search.js'
import { useNavigate } from 'react-router-dom'



const Searchbar = () => {
  const initialResults = {
    postResults:[],
    channelResults:[]
  }

  const [searchState,setSearchState] = useState('')
  const [searchResults,setSearchResults] = useState(initialResults)
  const navigate = useNavigate()


  const submitHandler = (e) => {
    e.preventDefault()
    // navigate(search)
  }
  const debouncedSearch = useDebounce(search,1000)

  useEffect(() => {
    searchState && 
      debouncedSearch(searchState,initialResults)
      .then((results) => setSearchResults(results))
  },[searchState])

  return(
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <button><UilSearch /></button>
        <input type='search'
          value={searchState}
          onChange={(e) => setSearchState(e.target.value)}
          className={styles['search-bar']}
        />
      </form>
      <div>
        <SearchResultsCompact postResults={searchResults.postResults} channelResults={searchResults.channelResults}/>
      </div>
    </div>
  )
}
export default Searchbar
