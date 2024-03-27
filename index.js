import dotenv from 'dotenv'
import express from 'express'
import { notFound,errorHandler} from "./middleware/errorMiddleware.js";
import cookieParser from 'cookie-parser';
import dbConnect from "./utils/dbConnect.js";
import cors from 'cors';

const app = express();
dotenv.config();
const port =process.env.PORT

import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
// import reviewRoutes from "./routes/reviewRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import payment from "./routes/paymentRoutes.js"
// import paymentak  from "./routes/Paymentak.js"


dbConnect()
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded( {extended: true }))
// app.use(cookieParser())

app.use("/api/user",userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/payment", payment);
// app.use("/api/paymentak", paymentak);


app.get('/config', (req, res) => {
    res.json({ adminEmail: process.env.ADMIN });
});

app.get("/",(req,res) => res.send("server is ready"));

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
}) 




