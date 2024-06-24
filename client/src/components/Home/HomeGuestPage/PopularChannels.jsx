
import { useEffect, useState } from 'react'

import ChannelList from '../../Channel/ChannelList'
import useLoading from '../../../hooks/useLoading'

const PopularChannels = () => {
  const [visibleChannels,setVisibleChannels] = useState([])
  const [Spinner, fetchWithLoading,isLoading] = useLoading(fetchPopularChannels)
  useEffect(() => {
    fetchWithLoading()
  },[])

  return (
      isLoading 
      ?
      <Spinner size={40} />
      :
      visibleChannels.length > 0 &&
      <ChannelList visibleChannels={visibleChannels}>
        <h6>Popular Channels</h6>
      </ChannelList>
  )
}

export default PopularChannels 
