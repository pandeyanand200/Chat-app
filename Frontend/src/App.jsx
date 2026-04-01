import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'
import { useAuthStore } from './lib/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#111]">
        <Loader className="size-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('./src/assets/bgimage.svg')] bg-cover bg-fixed">
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App
