/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo'),
  name: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
      state.name = ''
    },
    setName: (state, action) => {
      state.name = JSON.parse(localStorage.getItem('userInfo'))
    },
  },
})

export const { setCredentials, logout, setName } = authSlice.actions
export default authSlice.reducer
