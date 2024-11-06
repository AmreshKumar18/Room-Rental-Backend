import { Contact } from "../Models/ContactModel.js";

export const userContact = async (req, res) => {
  try {
    const { fullname, email, description } = req.body;
    if (!fullname || !email || !description) {
      return res.status(409).json({ message: "fill all details" });
    }
    const contactDetails = await Contact.create({
      fullname,
      email,
      description,
    });
    return res
      .status(200)
      .json({ message: "Details send to Adminstrative", contactDetails });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error while contact", error: error.message });
  }
};
