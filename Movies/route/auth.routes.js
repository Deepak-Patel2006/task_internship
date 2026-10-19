import express from "express";
import { signup,
    signin,
    getProfile
 } from "../control/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post('/signin', signin);

router.get("/profile", getProfile);

export default router;

