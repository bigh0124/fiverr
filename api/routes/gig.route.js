import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createGig, deleteGig, getGig, getGigs } from "../controllers/gig.controller.js";

const router = express.Router();

router.get("/:id", getGig);
router.get("/", getGigs);
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);

export default router;
