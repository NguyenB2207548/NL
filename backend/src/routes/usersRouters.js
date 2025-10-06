import express from "express";
const router = express.Router();

import { getAllUser } from "../controllers/usersControllers.js";

router.get("/", getAllUser);

export default router;
