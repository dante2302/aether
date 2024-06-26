import InfiniteScrollPosts from '../../InfiniteScroll/InfiniteScrollPosts'
import CreatePostBar from '../../Post/CreatePostBar'
import { getChannelData } from '../../../services/channelService'
import styles from './styles/HomeFeed.module.css'
import { useEffect, useRef, useState } from 'react'

const HomeFeed = ({userData}) => {
  return(
      <div className={styles['container']}>
        <CreatePostBar />
      {userPosts.length > 0 
        ? 
        <InfiniteScrollPosts />
        :
        <div>
          Welcome
        </div>
      }
      </div>
  )
}
export default HomeFeed
