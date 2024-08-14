import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connect from './config/db.js';
import cors from 'cors'

import bookingRouter from './routes/bookingRoute.js';


const PORT = 5000;
const app = express();
connect();
const whitelist = ['http://localhost:3000', 'https://auth.mahmud1.xyz', 'https://calendar.mahmud1.xyz/'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if(!origin){
      return callback(null, true);
    }
    if(whitelist.includes(origin))
      return callback(null, true)
      callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions))



app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req,res) => {
  console.log(req.headers)
  res.status(200).json({msg:"App is running smooth!"})
})

app.use('/api/booking/', bookingRouter)

app.listen(PORT,() => {
  console.log("App running!")
})