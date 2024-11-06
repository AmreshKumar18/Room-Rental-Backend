import { sellRoom } from "../Models/SellHomeModel.js";

export const addRoom = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const {
      title,
      description,
      address,
      mob_no,
      city,
      state,
      pincode,
      roomType,
      price,
      popular,
      facilities,
      latitude,
      longitude,
    } = req.body;
    const image = req.file;

    if (
      !title ||
      !description ||
      !address ||
      !mob_no ||
      !city ||
      !state ||
      !pincode ||
      !roomType ||
      !price ||
      !facilities ||
      !latitude ||
      !longitude
    ) {
      return res.status(404).json({ message: "fill all details" });
    }

    const newRoom = await sellRoom.create({
      title,
      description,
      address,
      mob_no: Number(mob_no),
      city,
      state,
      pincode,
      roomType,
      image,
      price,
      popular,
      facilities,
      latitude,
      longitude,
      owner: ownerId,
      image: image?.path,
    });

    return res.status(200).json({ message: "Room added", newRoom });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error while adding room", error: error.message });
  }
};

//  fetch all rooms

export const allRoom = async (req, res) => {
  try {
    const getAllRoom = await sellRoom.find();
    return res.status(200).json({ getAllRoom });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error while fetching all room", error: error.message });
  }
};

//  details of each room

export const roomDetails = async (req, res) => {
  try {
    const roomDetails = await sellRoom
      .findById(req.params.id)
      .populate("owner", "fullname");
    return res.status(200).json({ roomDetails });
  } catch (error) {
    return res.status(400).json({
      message: "error while fetching room details",
      error: error.message,
    });
  }
};

// review on product

export const roomReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const rentHome = await sellRoom.findById(req.params.id);

    if (!rentHome) {
      return res.status(404).json({ message: "Room not found" });
    }

    const review = {
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Update the reviews array and increment numReviews without triggering validation on other fields
    const updatedRoom = await sellRoom.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reviews: review },
        $inc: { numReviews: 1 },
        $set: { rating: calculateNewRating(rentHome.reviews, review.rating) },
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({ message: "Review added", updatedRoom });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while reviewing", error: error.message });
  }
};

// Helper function to calculate the new average rating
const calculateNewRating = (existingReviews, newRating) => {
  const totalRatings =
    existingReviews.reduce((acc, item) => item.rating + acc, 0) + newRating;
  const numReviews = existingReviews.length + 1;
  return (totalRatings / numReviews).toFixed(1);
};

// all review
export const allReview = async (req, res) => {
  try {
    const allReviews = await sellRoom
      .findById(req.params.id)
      .select("reviews")
      .populate({
        path: "reviews.user",
        select: "fullname", // Assumes the user's name field is 'fullname'
      });
    return res.status(200).json({ allReviews });
  } catch (error) {
    return res.status(400).json({
      message: "error while fetching all reviews",
      error: error.message,
    });
  }
};

// popular home
export const popularItems = async (req, res) => {
  try {
    const popularItems = await sellRoom.find({ popular: true });
    return res.status(200).json({ popularItems });
  } catch (error) {
    return res.status(400).json({
      message: "error while fetching popular items",
      error: error.message,
    });
  }
};
