/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '../slices/authSlice'

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const { name } = useSelector((state) => state.auth)
  const [image, setImage] = useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setName())
  }, [])
  console.log(name)
  return (
    <div>
      <div className="h-16 w-16 rounded-full">
        {name?.avatar && (
          <img src={name.avatar} className="h-full w-full rounded-full" />
        )}
      </div>
    </div>
  )
}

export default Home
