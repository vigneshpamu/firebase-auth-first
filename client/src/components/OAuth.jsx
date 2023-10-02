/* eslint-disable no-unused-vars */
import React from 'react'
import { app } from '../../firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/authSlice'
import { setName } from '../slices/authSlice'
import { useGoogleMutation } from '../slices/usersApiSlice'

const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [google, { isLoading }] = useGoogleMutation()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log(result)

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      })

      const data = await res.json()
      console.log(data)
      dispatch(setCredentials({ ...data }))
      //   dispatch(setName())
      navigate('/')
    } catch (error) {
      console.log('Could sign in with google')
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white w-full p-3 rounded-lg  hover:opacity-95"
    >
      Continue With Google
    </button>
  )
}

export default OAuth
