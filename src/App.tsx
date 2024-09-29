import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from './app/pages/Login'
import { Home } from './app/pages/Home'
import { Register } from '@/pages/Register'
import { AppContextProvider } from '@/context/appContext'

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
    <AppContextProvider>
      <RouterProvider router={router} /> 
    </AppContextProvider>
  )
}

export default App
