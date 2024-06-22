import SearchResultsCompact from './SearchResultsCompact'

import { searchPosts } from '../../services/postService.js' 
import { searchChannels } from '../../services/channelService.js'

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import useDebounce from '../../hooks/useDebounce.jsx'

import styles from './styles/Searchbar.module.css'
import  UilSearch from '@iconscout/react-unicons/icons/uil-search.js'



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
    if(searchState){
      search(searchState,10,0)
        .then((results) => {navigate('/search',{state:results})})
    }
  }

  const debouncedSearchCompact = useDebounce(searchCompact,1000)

  useEffect(() => {
    searchState && 
      debouncedSearchCompact(searchState,initialResults)
  },[searchState])

  return(
    <div className={styles['outer-container']}>
      <div className={styles['search-container']}>
      <form onSubmit={(e) => submitHandler(e)}>
        <button className={styles['search-btn']}><UilSearch /></button>
        <input type='search'
          value={searchState}
          className={styles['search-bar']}
          onChange={(e) => setSearchState(e.target.value)}
          onBlur={() => {
              setSearchState("");
              setSearchResults(initialResults);
          }}
        />
      </form>
      </div>
      <div className={styles['search-results']}>
        <SearchResultsCompact postResults={searchResults.postResults} channelResults={searchResults.channelResults}/>
      </div>
    </div>
  )
}
export default Searchbar
