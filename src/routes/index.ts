import express from "express";

import authRoute from "./auth.route";

import medicineRoute from "./medicine.route";

const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  // userRoute(router);
  medicineRoute(router);

  return router;
};
