import { useState, useEffect } from 'react'
import './App.css'
import dayjs from 'dayjs'
import {FaArrowLeft,  FaArrowRight  } from "react-icons/fa";
import {initialBooking, createBooking, removeBooking } from './slices/bookingSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllBookingMutation, useCreateBookingMutation } from './slices/bookingApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec']
  
  const [today,setToday] =  useState(new Date())
  const [date, setDate] = useState(dayjs().date());
  const [month, setMonth] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());
  const [loadingState, setLoadingState] = useState(false)
  
  const bookings = useSelector(state => state.booking)
  console.log("bookings", bookings)

  const dispatch = useDispatch();

  const [getAllBooking, {isLoading}] = useGetAllBookingMutation();
  const [createBookingApiCall, {isCreateLoading}] = useCreateBookingMutation();


  useEffect( () => {
     
    (async () => {

      try {
        const res = await getAllBooking({date,month,year}).unwrap();
        // console.log("api res",res);  
        dispatch(initialBooking(res.data));
        setLoadingState(false)  
      } catch (error) {
        console.log(error.message)
      }
  
    })();

  },[])


  const getPrevDay = async () => {
    setLoadingState(true)
    const newDay = dayjs(today).subtract(1,'day')
    setToday(newDay)
    setDate(dayjs(newDay).date())
    setMonth(dayjs(newDay).month())
    setYear(dayjs(newDay).year())
    try {
      const res = await getAllBooking({date:dayjs(newDay).date(),month,year}).unwrap(); 
      dispatch(initialBooking(res.data));
      setLoadingState(false)  
    } catch (error) {
      console.log(error.message)
      setLoadingState(false) 
    }


  }

  const getNextDay = async () => {
    setLoadingState(true) 
    const newDay = dayjs(today).add(1,'day')
    setToday(newDay)
    setDate(dayjs(newDay).date())
    setMonth(dayjs(newDay).month())
    setYear(dayjs(newDay).year())
    try {
      const res = await getAllBooking({date:dayjs(newDay).date(),month,year}).unwrap();
      dispatch(initialBooking(res.data));
      setLoadingState(false) 
    } catch (error) {
      console.log(error.message)
      setLoadingState(false) 
    }


  }

  const slotClickHandler = async (e) => {
    const slot = e.target.dataset.slot;
    const status = e.target.dataset.status;
    if(status == 'open'){
      try {
        const createBookingCall = await createBookingApiCall({date,month,year,slotId:slot}).unwrap();
        dispatch(createBooking(createBookingCall.booking));
        toast.success("Booking Confirmed!")
      } catch (error) {
        console.log("Error creating - ",error.message) 
      }
    }else if(status == 'booked'){
      toast.error("This slot is not available for booking!")
      //dispatch(removeBooking({date,month,year,slot, status:'open'}));
    }

  }

  let slot1, slot2, slot3,slot4, slot5;
  const renderSlots = () => {
    if(bookings){
      bookings.forEach(booking => {
        switch (booking.slotId) {
          case '1':
            slot1 = <div onClick={slotClickHandler} data-slot='1' data-status={booking.status} className={`px-4 py-2  ${booking.status == 'booked' ? 'bg-red-700' : ''}${booking.status == 'open' ? 'bg-green-700' : ''} ${booking.status == 'cancelled' ? 'bg-orange-700' : ''} text-white ${booking.status == 'booked' ? 'cursor-not-allowed ' : 'cursor-pointer'}  rounded text-center`}>10am - 12pm </div>
            
            break;
          case '2':
            slot2 = <div onClick={slotClickHandler} data-slot='2' data-status={booking.status} className={`px-4 py-2  ${booking.status == 'booked' ? 'bg-red-700' : ''}${booking.status == 'open' ? 'bg-green-700' : ''} ${booking.status == 'cancelled' ? 'bg-orange-700' : ''} text-white ${booking.status == 'booked' ? 'cursor-not-allowed ' : 'cursor-pointer'}  rounded text-center`}>12pm - 2pm</div>
            
            break;
          case '3':
            slot3 = <div onClick={slotClickHandler} data-slot='3' data-status={booking.status} className={`px-4 py-2  ${booking.status == 'booked' ? 'bg-red-700' : ''}${booking.status == 'open' ? 'bg-green-700' : ''} ${booking.status == 'cancelled' ? 'bg-orange-700' : ''} text-white ${booking.status == 'booked' ? 'cursor-not-allowed ' : 'cursor-pointer'}  rounded text-center`}>2pm - 4pm</div>
            
            break;
          case '4':
            slot4 = <div onClick={slotClickHandler} data-slot='4' data-status={booking.status} className={`px-4 py-2  ${booking.status == 'booked' ? 'bg-red-700' : ''}${booking.status == 'open' ? 'bg-green-700' : ''} ${booking.status == 'cancelled' ? 'bg-orange-700' : ''} text-white ${booking.status == 'booked' ? 'cursor-not-allowed ' : 'cursor-pointer'}  rounded text-center`}>4pm - 6pm</div>
            
            break;
          case '5':
            slot5 = <div onClick={slotClickHandler} data-slot='5' data-status={booking.status} className={`px-4 py-2  ${booking.status == 'booked' ? 'bg-red-700' : ''}${booking.status == 'open' ? 'bg-green-700' : ''} ${booking.status == 'cancelled' ? 'bg-orange-700' : ''} text-white ${booking.status == 'booked' ? 'cursor-not-allowed ' : 'cursor-pointer'}  rounded text-center`}>6pm - 8pm</div>
            
            break;
        
          default:
            break;
        }
      })
  
    
    }

  }

  renderSlots();


  let content = isLoading ? `Loading` : (<>
      {slot1}
      {slot2}
      {slot3}
      {slot4}
      {slot5}
    </>)

  content = isCreateLoading ? "Loading" : (<>
      {slot1}
      {slot2}
      {slot3}
      {slot4}
      {slot5}
  </>)
  

  return (
    <>
      <div className="flex flex-col max-w-[700px]  bg-gray-300 mx-auto p-6 rounded mt-10 ">
        <ToastContainer />
        <h1 className="text-xl text-center font-bold mb-10 select-none">Demo Booking system!</h1>
        
        <div className="flex justify-between">
          <div onClick={getPrevDay} className="arrow-left cursor-pointer"><FaArrowLeft size={28} /></div>
          <p className="text-center text-xl select-none">{date} {months[month]}, {year} </p>
          <div onClick={getNextDay} className="arrow-left cursor-pointer"><FaArrowRight size={28} /></div>
        </div>

        <div className="slots flex flex-col sm:flex-row gap-4 justify-between mt-10">
          {loadingState || isLoading ? 'Loading...' : content}
        </div>
        
      </div>
      
    </>
  )
}

export default App
