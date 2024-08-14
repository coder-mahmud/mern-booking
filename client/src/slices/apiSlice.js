import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiUrl = import.meta.env.VITE_apiUrl;
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl, credentials: 'include' }),
  endpoints: (builder) => ({}),
})

export default apiSlice;