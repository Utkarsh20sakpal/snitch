
import './App.css'
import { RouterProvider } from 'react-router';
import { routes } from './app.routes.jsx';
import {useAuth} from '../features/auth/hooks/useAuth.js'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {

  const {handelGetMe} = useAuth()
  const user = useSelector((state) => state.auth.user)
  console.log(user)

  useEffect (() => {
    handelGetMe()
  }, [] )


  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
