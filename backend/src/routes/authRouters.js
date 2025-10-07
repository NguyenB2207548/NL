import express from "express";
const router = express.Router();

import { signUP, signIn } from "../controllers/authControllers.js";

// SIGN UP
router.post("/sign-up", signUP);
router.post("/sign-in", signIn);

export default router;
