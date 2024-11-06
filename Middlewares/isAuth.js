import jwt from "jsonwebtoken";
import { Users } from "../Models/UsersModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(404).json({
        message: " Please Login...",
      });
    }
    const decodeData = jwt.verify(token, process.env.Jwt_sec);
    req.user = await Users.findById(decodeData._id);
    next();
  } catch (error) {
    return res.status(500).json({
      message: "login first",
    });
  }
};
