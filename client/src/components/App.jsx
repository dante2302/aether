import NavBar from './NavBar/NavBar.jsx'

import Home from './Home/Home.jsx'
import HomeGuest from './Home/HomeGuestPage/HomeGuestPage.jsx'

import UserPage from './UserPage/UserPage.jsx'
import UserPageFeed from './UserPage/UserPageFeed.jsx'

import ChannelPage from './Channel/ChannelPage'

import PostCreateForm from './Post/PostCreateForm.jsx'

import PostPage from './Post/PostPage.jsx'
import SearchResults from './Search/SearchResults.jsx'

import Page404 from './ErrorBoundary/Page404.jsx'
import GlobalErrorBoundary from './ErrorBoundary/GlobalErrorBoundary.jsx'

import { Routes, Route} from 'react-router-dom'

import { UserDataProvider } from '../contexts/UserDataContext.jsx'
import { UserModalProvider } from '../contexts/UserModalContext.jsx'
import ErrorPage from './ErrorBoundary/ErrorPage.jsx'

const App = () => {
  return (
    <GlobalErrorBoundary>
      <UserDataProvider>
        <UserModalProvider> 
          <NavBar />
          <div className='canvas'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='popular' element={<HomeGuest />} />
              <Route path='search' element={<SearchResults />} />
              <Route path={'c/:channelName'}>
                <Route index element={<ChannelPage />} />
                <Route path='submit' element={<PostCreateForm />} />
                <Route path={':postId'} element={<PostPage />} />
              </Route>
              <Route path='submit' element={<PostCreateForm />} />
              <Route path='/u/:username' element={<UserPage />}>
                <Route path='submitted' element={<UserPageFeed key={'posted'} type='posted' />} />
                <Route path='saved' element={<UserPageFeed key={'saved'} type='saved' />} />
                <Route path='liked' element={<UserPageFeed key={'liked'} type='liked'/>} />
                <Route path='disliked' element={<UserPageFeed key={'disliked'} type='disliked'/>} />
              </Route>
              <Route path='/*' element={<Page404 />} />
            <Route path="/error" element={<ErrorPage />}/>
            </Routes>
          </div>
        </ UserModalProvider> 
      </ UserDataProvider>
    </GlobalErrorBoundary>
  )
}

export default App
