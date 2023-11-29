import NavBar from './NavBar/NavBar.jsx'

import Home from './Home/Home.jsx'

import ChannelPage from './Channel/ChannelPage'

import PostCreationForm from './Post/PostCreationForm.jsx'

import UserPage from './UserPage/UserPage.jsx'
import UserCommentsPage from './UserPage/UserCommentsPage.jsx'
import UserPageFeed from './UserPage/UserPageFeed.jsx'

import Page404 from './Page404/Page404.jsx'

import { Routes, Route} from 'react-router-dom'
import { UserDataProvider } from './contexts/UserDataContext.jsx'
import { UserModalProvider } from './contexts/UserModalContext.jsx'
import HomeGuest from './Home/HomeGuestPage/HomeGuestPage.jsx'
import CommentForm from './Comment/CommentForm.jsx'
import CommentRender from './Comment/CommentRender.jsx'
import PostPage from './Post/PostPage.jsx'

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
              <Route path='submitted' element={<UserPageFeed type='posted' />} />
              <Route path='saved' element={<UserPageFeed type='saved' />} />
              <Route path='liked' element={<UserPageFeed type='liked'/>} />
              <Route path='disliked' element={<UserPageFeed type='disliked'/>} />
              <Route path='comments' element={<UserCommentsPage />} />
            </Route>
            <Route path='popular' element={<HomeGuest />} />
            <Route path='/*' element={<Page404 />} />
            <Route path='comment' element={<CommentForm postId={123} parentCommentId={''} replyTo={''} isReply={false}/>} />
            <Route path={'asd'} element={<PostPage postId={"7ae63e75-3a7e-4f8c-947a-c0a8f83a9ad3"}/>} />
            </Routes>
          </div>
        </ UserModalProvider> 
      </ UserDataProvider>
  )
}

export default App
