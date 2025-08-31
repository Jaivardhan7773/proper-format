import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from './routes/AppRouter'
import Navbar from './pages/nav/Navbar'
import './index.css'
import { useAuthStore } from './store/auth/useAuthStore'
import { useEffect } from "react";
function App() {

  const { user , checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])
  


  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="h-full bg-gray-900">
        <Navbar />
        <AppRouter />
      </div>
    </>
  )
}

export default App
