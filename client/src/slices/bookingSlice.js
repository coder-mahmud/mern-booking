import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers:{
    initialBooking: (state,action) => {
      console.log("Payload", action.payload)

      let slot1, slot2, slot3,slot4, slot5; 
      action.payload.forEach(booking => {
        switch (booking.slotId) {
          case '1':
            slot1 = booking
            break;
          case '2':
            slot2 = booking
            
            break;
          case '3':
            slot3 = booking
            
            break;
          case '4':
            slot4 = booking
            
            break;
          case '5':
            slot5 = booking
            
            break;
        
          default:
            break;
        }
      }) //end foreach

      if(!slot1){
        slot1 = {
          "status": "open",
          "slotId": "1",
        }
      }

      if(!slot2){
        slot2 = {
          "status": "open",
          "slotId": "2",
        }
      }

      if(!slot3){
        slot3 = {
          "status": "open",
          "slotId": "3",
        }
      }

      if(!slot4){
        slot4 = {
          "status": "open",
          "slotId": "4",
        }
      }

      if(!slot5){
        slot5 = {
          "status": "open",
          "slotId": "5",
        }
      }



      return ([
        slot1, slot2, slot3,slot4, slot5
      ]);
    },
    createBooking: (state,action) => {
      console.log("Create booking", action.payload)
      const slotId = action.payload.slotId;
      return state.map(booking => {
        if(booking.slotId == slotId){
          return action.payload
        }else{
          return booking
        }
      })
      
    },

    removeBooking: (state,action) => {
      console.log("Remove booking", action.payload)
      //state.push(action.payload)
    },


  }
})

export const {initialBooking, createBooking, removeBooking} = bookingSlice.actions;
export default bookingSlice.reducer