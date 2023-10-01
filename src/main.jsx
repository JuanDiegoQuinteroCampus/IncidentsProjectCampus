import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error404 from './routes/Error404'
import Register from './routes/Register'
import Login from './routes/Login'

import FormRegister from './components/FormRegister'
import FormLogin from './components/FormLogin'

import { NextUIProvider } from "@nextui-org/react" ;   

const root = createBrowserRouter([

  {
    path:"/",
    element:<Register/>,

    children:[
      {
        path:"Register/",
        element: <FormRegister/>
      }
    ],
    errorElement: <Error404/>
  },
  {
    path:"/",
    element:<Login/>,

    children:[
      {
        path:"Login/",
        element: <FormLogin/>
      }
    ],
    errorElement: <Error404/>
  },


])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={root}/>
    </NextUIProvider>
  </React.StrictMode>,
)
