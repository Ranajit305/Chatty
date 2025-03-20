import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Root from './pages/Root'
import { useAuthStore } from './stores/useAuthStore'
import Home from './pages/Home'

const App = () => {

  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={!user ? <Root /> : <Navigate to='/home' />}/>
        <Route path='/home' element={user ? <Home /> : <Navigate to='/'/>} />
      </Routes>
    </div>
  )
}

export default App