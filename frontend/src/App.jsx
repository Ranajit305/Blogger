import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import { useAuthStore } from './stores/useAuthStore'
import Blog from './pages/Blog'
import Account from './pages/Account'
import Navbar from './components/Navbar'
import User from './pages/User'

const App = () => {

  const { user, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div className='bg-slate-300'>
      <Navbar />
      <Routes>
        <Route path='/' element={!user ? <Home /> : <Navigate to='/home'/>}/>
        <Route path='/home' element={user ? <Home /> : <Navigate to='/'/>} />
        <Route path='/account' element={user ? <Account /> : <Navigate to='/'/>} />
        <Route path='/blog' element={user ? <Blog /> : <Navigate to='/'/>} />
        <Route path='/user/:userId' element={user ? <User /> : <Navigate to='/'/>} />
      </Routes>
    </div>
  )
}

export default App