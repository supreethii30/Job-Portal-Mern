import { createBrowserRouter } from 'react-router-dom'
import Navbar from './components/shared/Navbar.jsx'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
   {
    path:'/login',
    element:<Login/>
  },
   {
    path:'/signup',
    element:<Signup/>
  },
   {
    path:'/',
    element:<Home/>
  },
   {
    path:'/',
    element:<Home/>
  },
  
])
function App() {


  return (
    <>
    <Navbar/>
    </>
  )
}

export default App
