import { Users } from "../Models/UsersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, mob_no, adharno, question } = req.body;
    let user = await Users.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      fullname,
      email,
      password: hashPassword,
      mob_no,
      adharno,
      question,
    });

    await newUser.save();
    // jwt create
    const activationToken = jwt.sign(
      { _id: newUser._id },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "User Created Successfully",
      token: activationToken,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error while register user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(404).json({ message: "Password incorrect" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.jwt_sec, {
      expiresIn: "1d",
    });
    return res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error while login", error: error.message });
  }
};
