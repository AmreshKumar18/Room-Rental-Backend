import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  fullname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  mob_no: {
    required: true,
    type: Number,
  },
  password: {
    required: true,
    type: String,
  },
  adharno: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },

});

export const Users = mongoose.model("Users", userSchema);
