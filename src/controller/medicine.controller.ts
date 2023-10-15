import express from "express";
import { createMedicine, getMedicines, MedcineModel } from "../models/medicine.model";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const getAllMedicines = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const medicines = await getMedicines();

    return res.status(200).json(medicines);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createUserMedicine = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, dosage, medicineType, remindMeInHr, image } = req.body;

    if (!name || !dosage || !medicineType || !remindMeInHr) {
      return res.sendStatus(400);
    }
    const medicine = await createMedicine({
      name,
      dosage,
      medicineType,
      remindMeInHr,
      image,
    });

    return res.status(200).json(medicine).end();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Failed to create medicine: " + error.message })
      .end();
  }
};
//{_id:new mongoose.Types.ObjectId(req.params.id).toHexString()}
export const deleteUserMedicine = async (req: Request, res: Response) => {
  console.log(req.params)

  try {
    const deleted = await MedcineModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) })
    res.send(deleted)
  } catch (error) {
    return res.status(500).json({ error: "failed to delete: " + error.message })
  }

}


export const updateUserMedicine = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.params)
  const { id } = req.params;
  // console.log(id)
  const updates = req.body;

  try {
    const updatedMedicine = await MedcineModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

