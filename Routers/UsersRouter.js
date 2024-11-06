import express from "express";
import { loginUser, registerUser } from "../Controllers/UsersController.js";

const router = express.Router();

router.post("/userregister", registerUser);
router.post("/loginuser", loginUser);

export default router;
