import {useEffect, useContext} from 'react'

import UserDataContext from '../../contexts/UserDataContext'
import UserModalContext from '../../contexts/UserModalContext'

import  useDebounce  from '../../hooks/useDebounce'

import styles from './styles/JoinButton.module.css'
import {  joinChannel, leaveChannel } from '../../services/channelService'

const JoinButton = ({ channelData, isJoined, setJoined }) => {
  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)

  const joinHandler = async () => {
    if (!userData) { toggleUserModal(); return }
    if(!isJoined){
      console.log(await joinChannel(channelData.id, userData));
      setJoined(true)
    }

    else{
      console.log(await leaveChannel(channelData.id, userData));
      setJoined(false);
    }
  } 

  return ( 
        //If the user is not logged in -> execute the function immediately, else 500 ms delay
    <button onClick={useDebounce(joinHandler,userData ? 200 : 0)} className={styles['join-btn']}>
      {!isJoined
        ?
        'Join'
        :
        'Joined'
      }
    </button>
  )
}

export default JoinButton
