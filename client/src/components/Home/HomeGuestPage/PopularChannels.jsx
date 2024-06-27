
import { useEffect, useState } from 'react'

import ChannelList from '../../Channel/ChannelList'
import useLoading from '../../../hooks/useLoading'
import { getMemberCount, getPopularChannels } from '../../../services/channelService'
import { useNavigate } from 'react-router-dom'

const PopularChannels = () => {
  const [visibleChannels,setVisibleChannels] = useState([])
  const [Spinner, fetchWithLoading,isLoading] = useLoading(fetching)
  const navigate = useNavigate();

  async function fetching() {
    const response = await getPopularChannels();

    if (!response.ok)
      navigate("/error");

    const channels = await response.json();
    for(let i = 0; i < channels.length; i++)
    {
        const response = await getMemberCount(channels[i].id)
        if(!response.ok)
          navigate("/error");
        const memberCount = await response.json();
        channels[i] = {...channels[i], memberCount};
    }
    setVisibleChannels(channels);
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
