import express from "express";
import { isAuth } from "../Middlewares/isAuth.js";
import { userContact } from "../Controllers/ContactController.js";

const router = express.Router();

router.post("/contact-details", isAuth, userContact);

export default router;
