import React from 'react'
import {Link, Outlet} from 'react-router-dom'

export default function Register() {
    const login ="Login"
  return (
    <>
        <ul>
            <li>
                <Link to={`/login`}>Login</Link>
            </li>
            <li>
                <Link to="/Register">Register</Link>
             </li>
        </ul>
        <Outlet context={[login]} />
    </>
  )
}
