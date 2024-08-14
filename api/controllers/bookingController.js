import Booking from "../models/bookingModel.js"

const getAllBooking = async(req,res) => {
  const {date, month, year } = req.body;
  try {
    const bookings = await Booking.find({date, month, year});
    res.status(200).json({msg:"Success!", data:bookings})
  } catch (error) {
    res.status(401).json({msg:"No Bookings found!"})
  }
}

const createBooking = async (req, res) => {
  const { date, month, year, slotId } = req.body;
  console.log("Create body",req.body)
  try {
    const newBooking = await Booking.create({ date, month, year, slotId });
    res.status(201).json({
      msg: "Created new booking",
      booking: {
        id: newBooking._id,
        date: newBooking.date,
        month: newBooking.month,
        year: newBooking.year,
        slotId: newBooking.slotId,
        status:newBooking.status,
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editBooking = async (req,res) => {
  const {bookingId} = req.body
  try {
    const booking = await Booking.findById(bookingId)
    if(booking){
      booking.date = req.body.date || booking.date;
      booking.month = req.body.month || booking.month;
      booking.year = req.body.year || booking.year;
      booking.slotId = req.body.slotId || booking.slotId;
      booking.status = req.body.status || booking.status;
      const updatedBooking = await booking.save();

      res.status(200).json({
        msg: "Booking Edited",
        data: {
          id: updatedBooking._id,
          date: updatedBooking.date,
          month: updatedBooking.month,
          year: updatedBooking.year,
          slotId: updatedBooking.slotId,
          status: updatedBooking.status,
        }
      }); 


    }
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export {getAllBooking,createBooking,editBooking}