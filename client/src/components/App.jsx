import NavBar from './NavBar/NavBar.jsx'

import Home from './Home/Home.jsx'

import ChannelPage from './Channel/ChannelPage'

import PostCreationForm from './Post/PostCreationForm.jsx'

import UserPage from './UserPage/UserPage.jsx'
import SavedPosts from './UserPage/SavedPosts/SavedPosts.jsx'
import LikedPosts from './UserPage/LikedPosts/LikedPosts.jsx'
import DislikedPosts from './UserPage/DislikedPosts/DislikedPosts.jsx'
import Comments from './UserPage/Comments/Comments.jsx'

import { Routes, Route} from 'react-router-dom'
import { UserDataProvider } from './contexts/UserDataContext.jsx'
import { UserModalProvider } from './contexts/UserModalContext.jsx'

const App = () => {
  return (
      <UserDataProvider>
        <UserModalProvider> 
          <NavBar />
          <div className='canvas'>
            <Routes>
              <Route path={`c/:channelName`}>
                <Route index element={<ChannelPage />} />
                <Route path='submit' element={<PostCreationForm />} />
              </Route>
              <Route path='submit' element={<PostCreationForm />} />
              <Route path='/' element={<Home />} />
            <Route path='/u/:username' element={<UserPage />}>
              <Route path='saved' elemnet={<SavedPosts />} />
              <Route path='liked' element={<LikedPosts />} />
              <Route path='disliked' element={<DislikedPosts />} />
              <Route path='comments' element={<Comments />} />
            </Route>
            </Routes>
          </div>
        </ UserModalProvider> 
      </ UserDataProvider>
  )
}

export default App
