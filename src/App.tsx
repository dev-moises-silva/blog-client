import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from './app/pages/Login'
import { Home } from './app/pages/Home'
import { Register } from '@/pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/registrar-se',
    element: <Register />
  }
])

function App() {

  return (
    <RouterProvider router={router} /> 
  )
}

export default App
