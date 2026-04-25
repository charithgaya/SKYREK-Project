import express from "express"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js"
import jwt from "jsonwebtoken"
import productRouter from "./routers/productRouter.js"
import dotenv from "dotenv"
import cors from "cors"
import orderRouter from "./routers/orderRouter.js"

dotenv.config()

const app = express()


app.use(express.json())
app.use(cors())

app.use(
    (req, res, next)=>{
        const value = req.header("Authorization")

        if(value != null){
            const token = value.replace("Bearer ","")
            jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err, decoded)=>{
                    if(err || decoded == null){
                        res.status(403).json({
                            message : "Unauthorized"
                        })
                    }else{
                        req.user = decoded
                        next()
                    }                    
                }
            )
        }else{
            next()
        }        
    }
)

const connectionString = process.env.MONGO_URI

// console.log("Connection String: ", connectionString);



mongoose.connect(connectionString)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, ()=>{
        console.log("server started");
    });
})
.catch(
    (err)=>{
        console.log("MongoDB Error: ", err.message);
    }
)

app.get("/", (req, res)=>{
    res.send("API is running...");
})

app.use("/api/users", userRouter)
app.use("/api/products",productRouter)
app.use("/api/orders", orderRouter)

