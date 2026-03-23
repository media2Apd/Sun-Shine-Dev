// cSpell: ignore Naach
import express from 'express';
import connectDB from './config/db.js';
import http from 'http'
import errorHandler from './middlewares/errorHandler.js';
import router from './routes/routers.js'
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const server = http.createServer(app);



// Define allowed originss
// const allowedOrigins = ["http://192.168.0.15:3000","http://localhost:3000", "http://localhost:3001", "https://s1g57ln1-3000.inc1.devtunnels.ms", "http://192.168.0.3:3000", "https://naach-boutique.vercel.app", "https://app.naachboutique.com", "https://naach-boutique-five.vercel.app"];
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

// Setup CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
})); // keep raw request buffer for webhook signature verification
app.use(bodyParser.urlencoded({ extended: true })); // for form data
app.use(express.json());
app.use('/api', router);
app.get('/',(req,res)=>{
  res.end("welcome to Regees Tex API")
});
app.use(errorHandler);

connectDB();

const port = 5000;
server.listen(port, () => console.log(`Server started on port ${port}`)); 
