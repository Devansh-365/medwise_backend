import express, { Request, Response } from "express";
import {
  createUserMedicine,
  getAllMedicines,
} from "../controller/medicine.controller";

export default (router: express.Router) => {
  router.get("/medicines", getAllMedicines);
  router.post("/medicine", createUserMedicine);
};
