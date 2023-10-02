/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/auth/signout`)
      const data = await res.json()
      if (data.success === false) {
        return
      }
      console.log(data)
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-slate-500 flex justify-between p-2">
      <div>Header</div>
      <div className="flex gap-2">
        {userInfo ? (
          <button onClick={handleSignOut}>Log Out</button>
        ) : (
          <>
            <Link
              to="/sign-in"
              className="text-white p-2 border border-red-500"
            >
              <button>Login</button>
            </Link>
            <Link
              to="/sign-up"
              className="text-white p-2 border border-red-500"
            >
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
