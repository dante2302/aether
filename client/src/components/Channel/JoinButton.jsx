import { updateChannelData } from '../../apis/channelService.js' 
import { updateUserData } from '../../apis/userApi.js'

import {useEffect, useContext} from 'react'

import UserDataContext from '../../contexts/UserDataContext'
import UserModalContext from '../../contexts/UserModalContext'

import  useDebounce  from '../../hooks/useDebounce'

import styles from './styles/JoinButton.module.css'

const JoinButton = ({channelData, setChannelData,isJoined, setJoined}) =>{
  const {userData,setUserData} = useContext(UserDataContext)
  const {userModal,toggleUserModal} = useContext(UserModalContext)

  useEffect(() => {
    if(userData && channelData.members){
      setJoined(channelData.members.includes(userData._ownerId))
    }
  },[channelData,userModal])

  const joinHandler = () => {
    if(!userData || Object.keys(userData).length == 0){toggleUserModal();return}
    let newChannels = []
    let newMembers = []

    if(isJoined){
      newChannels = [...userData.channels.filter((channelId) => channelId !== channelData._id )]
      newMembers = channelData.members.filter((member) => member !== userData._ownerId)
      updateUserData(userData, {channels:newChannels})
        .then((data) => {
        setUserData({...data})
      })
      updateChannelData(channelData._id,{members: newMembers})
      .then((data) => {
          setChannelData(data)
      })
      setJoined(false)
    }

    else{
      newChannels = [...userData.channels, channelData._id]
      newMembers = [...channelData.members, userData._ownerId]
      updateUserData(userData, {channels: newChannels})
        .then((data) => {
        setUserData(data)
      })

      updateChannelData(channelData._id,{members: newMembers})
      .then((data) => {
          setChannelData(data)
      })
      setJoined(true)
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
