import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import Home from '../pages/landing/Home'
import Portfolio from '../pages/landing/Portfolio';
import Blog from '../pages/landing/Blog';


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/portfolio' element={<Portfolio/>}/>
            <Route path='/blog' element={<Blog/>}/>

        </Routes>
    )
}

export default AppRouter;