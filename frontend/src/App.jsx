import { useState } from 'react'
import AppRouter from './routes/AppRouter'
import Navbar from './pages/nav/Navbar'
import './index.css'
function App() {
  const [count, setCount] = useState(0)

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
