import React from 'react'
import {Link, Outlet} from 'react-router-dom'

export default function Register() {
    const register ="Register"
    const login ="Login"
  return (
    <>
        <ul>
            <li>
                <Link to={`/Register`}>Register</Link>
                
            </li>
            <li>
                <Link to={`/login`}>Login</Link>
                 
            </li>
        </ul>
        <Outlet context={[register]} />
       
    </>
  )
}
