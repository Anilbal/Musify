import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeLayout from './layout/HomeLayout'
import HeroPage from './pages/HeroPage'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import SelectiveRoutes from './SelectiveRoutes'
import Library from './pages/Library'
import UserLayout from './layout/UserLayout'
import MyMusic from './pages/MyMusic'
import Playlists from './pages/Playlists'
import Trending from './pages/Trending'
import LikedSongs from './pages/LikedSongs'
import LibraryLayout from './layout/LibraryLayout'
import FavouriteArtist from './pages/FavouriteArtist'
import UserProfile from './pages/userProfile/UserProfile'
import PlaylistsDetails from './pages/PlaylistsDetails'
import Artists from './pages/Artists'
import ArtistsDetails from './pages/ArtistsDetails'
import EditProfile from './pages/userProfile/EditProfile'
import TestingSongPage from './pages/TestingSongPage'

const MyRoutes = () => {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<HomeLayout/>}>
            <Route index element={<HeroPage/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>

            {/* if user is login  */}
            <Route path='/' element={<SelectiveRoutes/>}>
            <Route path='musify' element={<UserLayout/>}>
              <Route index element={<HomePage/>}/>
              <Route path='library' element={<LibraryLayout/>}>
                <Route index element={<Library/>}/>
                <Route path='likedsongs' element={<LikedSongs/>}/>
                <Route path='playlist' element={<Playlists/>}/>
                <Route path='favourite' element={<FavouriteArtist/>}/>
              </Route>
              <Route path='myplaylist/:id' element={<PlaylistsDetails/>}/>
              <Route path='singleartist/:id' element={<ArtistsDetails/>}/>
              <Route path='music' element={<MyMusic/>}/>
              <Route path='artist' element={<Artists/>}/>
              <Route path='trending' element={<Trending/>}/>
              <Route path='profile' element={<UserProfile/>}/>
              <Route path='edit' element={<EditProfile/>}/>
              <Route path='test' element={<TestingSongPage/>}/>

            </Route>
            </Route>
        </Route>
     </Routes>
     </BrowserRouter>   
    </>
  )
}

export default MyRoutes