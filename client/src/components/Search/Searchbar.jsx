import SearchResultsCompact from './SearchResultsCompact'

import useDebounce from '../hooks/useDebounce.jsx'
import { searchPosts } from '../apis/postApi.js' 
import { searchChannels } from '../apis/channelApi.js'
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


  const searchCompact = (value) => {
    // This function is responsible for the search results shown under the searchbar
    //
    search(value,5,0).then((results) => {
    // 5 and 0 respectively being pageSize and offset
      let {channelResults,postResults} = results;
      if(channelResults.length > 0)results = {...results,channelResults}
      if(postResults.length > 0) results = {...results,postResults}
      setSearchResults(results)
    })
  }

  const search = async (value,pageSize,offset) => {
    let postResults = await searchPosts(value,pageSize,offset)  
    let channelResults = await searchChannels(value,pageSize,offset)
    return {channelResults,postResults}
  }

  const submitHandler = (e) => {
    e.preventDefault()
    search(searchState,10,0)
      .then((results) => {navigate('/search',{state:results})})
  }

  const debouncedSearchCompact = useDebounce(searchCompact,1000)

  useEffect(() => {
    searchState && 
      debouncedSearchCompact(searchState,initialResults)
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
