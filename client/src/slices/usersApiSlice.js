/* eslint-disable no-unused-vars */
import { apiSlice } from './apiSlice'
const USERS_URL = '/api/auth'
const TODOS_URL = '/api/todo'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signin`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    google: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/google`,
        method: 'POST',
        body: data,
      }),
    }),
    getUserInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getuser`,
        method: 'GET',
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
        body: data,
      }),
    }),
    getTodo: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/gettodo`,
        method: 'GET',
      }),
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/addtodo`,
        method: 'PUT',
        body: data,
      }),
    }),
    moveToPro: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/progress`,
        method: 'PUT',
        body: data,
      }),
    }),
    moveToCom: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/complete`,
        method: 'PUT',
        body: data,
      }),
    }),
    moveToTodo: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/todo`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateCompleted: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/todo/update`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/todo/delete`,
        method: 'DELETE',
        body: data,
      }),
    }),
    updateTodo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/todo/up`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleMutation,
  useLogoutMutation,
  useGetUserMutation,
  useUpdateUserMutation,
  useGetTodoMutation,
  useAddTodoMutation,
  useUpdateCompletedMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useGetUserInfoMutation,
  useMoveToProMutation,
  useMoveToComMutation,
  useMoveToTodoMutation,
} = usersApiSlice
