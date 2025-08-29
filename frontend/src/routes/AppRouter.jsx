import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={"none"} />
            <Route path='signup' element={<SignUp />} />
            <Route path='login' element={<Login />} />
        </Routes>
    )
}

export default AppRouter;