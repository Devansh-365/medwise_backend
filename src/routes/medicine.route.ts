import express, { Request, Response } from "express";
import {
  createUserMedicine,
  getAllMedicines,
  deleteUserMedicine,updateUserMedicine
} from "../controller/medicine.controller";

export default (router: express.Router) => {
  router.get("/medicines", getAllMedicines);
  router.post("/medicine", createUserMedicine);
  router.delete("/:id",deleteUserMedicine);
  router.put("/:id",updateUserMedicine);
};
