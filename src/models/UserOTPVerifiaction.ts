import mongoose, { Schema } from "mongoose";
const shema=mongoose.Schema

const UserOTPVerificationschema=new Schema(
    {
        userID:String,
        otp:String,
        createdAt:String,
        expiresAt:String,
    }
)

export const UserOTPVerification= mongoose.model(
    "UserOTPVerifiaction",
    UserOTPVerificationschema
)

