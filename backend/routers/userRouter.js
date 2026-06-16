import express from 'express';
import { createUser, getUser, googleLogin, loginUser, resetPassword, sendOTP, isAdmin } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post("/",createUser)
userRouter.get("/",getUser)
userRouter.post("/login",loginUser)
// userRouter.get("/admin",isAdmin)
userRouter.post("/register", createUser)
userRouter.post("/google-login", googleLogin)
userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password",resetPassword)


export default userRouter;