import mongoose from "mongoose";
import logger from "../utils/logger";
import { request } from "http";

const MedicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: Number,
      required: true,
    },
    medicineType: {
      type: String,
      enum: ["bottle", "syringe", "tablet", "pill"],
      required: true,
    },
    remindMeInHr: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MedcineModel = mongoose.model("Medicine", MedicineSchema);

// Medicine Actions
export const getMedicines = () => MedcineModel.find();
export const createMedicine = (values: Record<string, any>) => {
  return new MedcineModel(values)
    .save()
    .then((medicine) => medicine.toObject())
    .catch((error) => {
      // Handle the error, log it, or return an error response
      logger.error("Error creating medicine:", error);
      throw new Error("Failed to create medicine.");
    });
};

export const deleteMedicine=async(id:any) =>{
  id=id.toString
  console.log(id,"in model file")
  MedcineModel.findOneAndDelete(id)
}


