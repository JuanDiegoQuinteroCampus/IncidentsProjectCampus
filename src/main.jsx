import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error404 from './routes/Error404';

import FormRegister from './components/FormRegister';
import FormLogin from './components/FormLogin';
import Reports from './components/Reports';
import { NextUIProvider } from "@nextui-org/react";
import Home from './components/Home';
import Start from './components/dasboard/Start';
import Incidents from "./components/dasboard/Incidents";


// ... Otros imports ...


const root = createBrowserRouter([
  
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <Start /> }, 
      { path: "/register", element: <FormRegister /> }, 
      { path: "/login", element: <FormLogin /> }, 
      { path: "/reports", element: <Reports /> }, 
      { path: "/incidents", element: <Incidents /> }, 

    ],
    errorElement: <Error404 />,
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={root}/>
    </NextUIProvider>
  </React.StrictMode>,
);
