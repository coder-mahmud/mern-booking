import {configureStore} from '@reduxjs/toolkit'
import bookingReducer from './slices/bookingSlice';
import apiSlice from './slices/apiSlice';

const store = configureStore({
  reducer:{
    booking:bookingReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})


export default store;