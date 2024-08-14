import express from 'express'
const bookingRouter = express.Router();
import { getAllBooking,createBooking,editBooking } from '../controllers/bookingController.js';

bookingRouter.post('/',getAllBooking)
bookingRouter.post('/create',createBooking);
bookingRouter.put('/edit',editBooking);


export default bookingRouter;