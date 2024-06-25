
import { useEffect, useState } from 'react'

import ChannelList from '../../Channel/ChannelList'
import useLoading from '../../../hooks/useLoading'
import { getPopularChannels } from '../../../services/channelService'
import { useNavigate } from 'react-router-dom'

const PopularChannels = () => {
  const [visibleChannels,setVisibleChannels] = useState([])
  const [Spinner, fetchWithLoading,isLoading] = useLoading(fetching)
  const navigate = useNavigate();

  async function fetching(){
    const response = await getPopularChannels();
    console.log(response);
    if(!response.ok)
      navigate("/error");
    setVisibleChannels(await response.json());
  }
  useEffect(() => {
    (async () => await fetchWithLoading())()
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
