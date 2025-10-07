import express from "express";
const router = express.Router();
import { getAllMovie } from "../controllers/moviesControllers.js";

router.get("/", getAllMovie);

export default router;
