import express from "express";
import { createUser, getUserByEmail } from "../models/user.model";
import { authentication, random } from "../utils/auth";
import nodemailer from 'nodemailer'
import {UserOTPVerification} from "../models/UserOTPVerifiaction"
import * as bcrypt from 'bcrypt';



export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
   
     
    res.cookie("AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {}
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
   
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'pansy.spencer50@ethereal.email',
      pass: 'EGPS3W75BhHfjECZj8'
  }
});

transporter.verify((error,success)=>{
  if(error){
    console.log(error); 
  }
  else{
    console.log("ready for message");
    console.log(success)
  }
})
interface User {
  _id: string;
  email: string;
}

export const sendOTPVerification =async(users:User,res:express.Response)=>{
  try {
    const otp=`${Math.floor(1000+ Math.random()*9000)}`
      const mailOptions={
        from:"pansy.spencer50@ethereal.email",
        to:users.email,
        subject:"Please Verify your email",
        html:`<p> ${otp} in the app to Verify email address and complete register</p>`

      };
      const saltRound=10;
     const hashedOTP= await bcrypt.hash(otp,saltRound)

      const newOTPVerification=new UserOTPVerification({
        userID:users._id,
        otp:hashedOTP,
        createdAt:Date.now(),
        expiresAt:Date.now()* 1800000,
      })
    await newOTPVerification.save()
    await transporter.sendMail(mailOptions)
    res.json({
      status: "pending",
      message: "Verification OTP sent on email",
      data: {
        userId:users._id,
        email: users.email, 
      }
    });
    
  } catch (error) {
   res.json({
    status:"failed",
    message:error.message
   }) 
  }
}