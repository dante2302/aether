import { searchPosts } from '../apis/postApi.js' 
import { searchChannels } from '../apis/channelApi.js'

const search = async (value,initialResults) => {
    let results = initialResults
    if(value.length > 2){
      const postResults = await searchPosts(value)
      const channelResults = await searchChannels(value,5,0)
      // 5 and 0 being  pageSize and offset respectively
      if(postResults.length > 0)results = {...results,postResults}
      if(channelResults.length > 0)results = {...results,channelResults}
      return results
    }
    return results
}
export default search
