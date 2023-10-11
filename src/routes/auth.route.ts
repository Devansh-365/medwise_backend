import express from "express";

import { login, register } from "../controller/auth.controller";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
