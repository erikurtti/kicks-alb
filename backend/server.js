import cors from 'cors'
import 'dotenv/config'
import express from "express"
import { connectDB } from "./config/db.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import shoeRouter from "./routes/shoeRoute.js"
import userRouter from "./routes/userRoute.js"



// app config
const app = express()
const port = process.env.PORT || 4000;


// middlewares
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/shoe", shoeRouter)
app.use("/images", express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://192.168.100.32:${port}`))
