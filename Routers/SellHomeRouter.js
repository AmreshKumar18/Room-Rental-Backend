import express from "express";
import {
  addRoom,
  allReview,
  allRoom,
  popularItems,
  roomDetails,
  roomReview,
} from "../Controllers/SellHomeController.js";
import { isAuth } from "../Middlewares/isAuth.js";
import { uploadFiles } from "../Middlewares/Multer.js";

const router = express.Router();

router.post("/addroom", isAuth, uploadFiles, addRoom);
router.get("/allroom", allRoom);
router.get("/roomdetails/:id", roomDetails);
router.post("/add-review/:id", isAuth, roomReview);
router.get("/all-reviews/:id", allReview);
router.get("/popular-items", popularItems)

export default router;
