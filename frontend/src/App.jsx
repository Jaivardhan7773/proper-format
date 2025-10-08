import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from './routes/AppRouter'
import Navbar from './pages/nav/Navbar'
import './index.css'
import { useAuthStore } from './store/auth/useAuthStore'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {

  const { checkAuth, user, isCheckingAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  console.log(user)

  if (isCheckingAuth) {
    return (
      <div className="flex  justify-center items-center min-h-dvh bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }



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
