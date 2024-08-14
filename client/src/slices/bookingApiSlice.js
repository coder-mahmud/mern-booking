import apiSlice from "./apiSlice";
const BOOKING_URL = '/booking/'
const BOOKING_CREATE_URL = '/booking/create'

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    getAllBooking : builder.mutation({
      query:(data) => ({
        url:BOOKING_URL,
        method:"POST",
        body:data
      })
    }),
    createBooking : builder.mutation({
      query:(data) => ({
        url:BOOKING_CREATE_URL,
        method:"POST",
        body:data
      })
    }),

  })
})


export const {useGetAllBookingMutation, useCreateBookingMutation} = bookingApiSlice ;