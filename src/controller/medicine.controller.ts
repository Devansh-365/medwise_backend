import express from "express";
import { createMedicine, getMedicines } from "../models/medicine.model";

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
