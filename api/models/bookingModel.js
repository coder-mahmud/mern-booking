import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'booked',
    enum : ['open','booked','closed','cancelled'],
  },
  slotId: {
    type: String,
    required: true
  }
})

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

