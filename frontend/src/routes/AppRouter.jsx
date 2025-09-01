import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import Home from '../pages/landing/Home'
import Portfolio from '../pages/landing/Portfolio';
import Blog from '../pages/landing/Blog';
import { useAuthStore } from '../store/auth/useAuthStore';
import Team from '../pages/landing/Team';


const AppRouter = () => {
    const { user } = useAuthStore()
    return (
        <Routes>
            <Route path='/' element={user ? <Home /> : <Login />} />
            <Route path='/signup' element={user ? <Home /> : <SignUp />} />
            <Route path='/login' element={user ? <Home /> : <Login />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/team' element={<Team />} />

        </Routes>
    )
}

export default AppRouter;