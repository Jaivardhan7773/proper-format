import { useState } from 'react'
import AppRouter from './routes/AppRouter'
import Navbar from './pages/nav/Navbar'
import './index.css'
import { useAuthStore } from './store/auth/useAuthStore'
function App() {

  const { authUser, isCheckingAuth } = useAuthStore()
  

  return (
    <>
      <div className="h-full bg-gray-900">
        {/* <Navbar /> */}
        <AppRouter />
      </div>
    </>
  )
}

export default App
