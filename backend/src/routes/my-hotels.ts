import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { body } from "express-validator";

import verifyToken from "../middelware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import { json } from "stream/consumers";

const router = express.Router();
// multer configuration
const storage = multer.memoryStorage();
// upload middleware for multer instance
const upload = multer({
  storage: storage, //  storage location
  limits: {
    fileSize: 5 * 1024 * 1024, //  image will not exceed on (5mb)
  },
});

// ADD NEW HOTEL
// /api/my-hotels
// "imageFiles" is a part of field name of a multipart/form-data
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Hotel name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Hotel description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // upload the images first in the cloudinary
      const imageUrls = await uploadImages(imageFiles);

      // if the upload is successfull it will return a URL and add the URL to the newHotel constant
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date(); //  save the creating time
      newHotel.userId = req.userId; //  get the userId from the auth token and store it alongside with the hotel info

      // save the newHotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // return a 201 status if the response is success
      res.status(201).json(hotel);
    } catch (error) {
      console.log("Error creating hotel: ", error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

// FETCH ALL HOTELS ACCORDING TO THE USER ID
// /api/my-hotels
router.get("/", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const hotels = await Hotel.find({ userId });
    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

//  GET SINGLE HOTEL BY USING HOTEL ID
// /api/my-hotels/:id
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel" });
  }
});

// UPDATE SINGLE HOTEL
// /api/update-hotel/:id
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    // we get the hotel id from the endpoint using req.params
    const hotelId = req.params.hotelId.toString();
    try {
      // store the header body request to updated hotel
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();          //  update the lastUpdated property

      // serch a hotel inside of our document with the use of hotelId and userId from auth_token
      const hotel = await Hotel.findOneAndUpdate(
        { _id: hotelId, userId: req.userId },
        updatedHotel,
        { new: true }
      );
      // check if the hotel is truthy or exist if not throw an error "Hotel not found"
      if (!hotel) return res.status(404).json({ message: "Hotel not found" });

      // get all the images from our request using req.files set its type to Express.Multer.File[]
      const imageFiles = req.files as Express.Multer.File[];
      // get the image url using uploadImages async function
      const updatedImageUrls = await uploadImages(imageFiles);
      // check if the updatedImageUrls return a value if not return a custom error message
      if(!updatedImageUrls) return res.status(500).json({ message: "Error handling images from Cloudinary service"})
      // update the updatedImageUrls in our document with our document
      hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

      // save the new update of our hotel
      await hotel.save()

      // send the updatedHotel data in a json file
      res.status(201).json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  // arrow function for uploading multiple files using map()
  const uploadPromises = imageFiles.map(async (image) => {
    // converting our images into binary and set to base64 format
    const b64 = Buffer.from(image.buffer).toString("base64");
    // create a uri that will accept by the cloudinary service
    const dataURI = "data:" + image.mimetype + ";base64," + b64;
    // upload the images using the cloudinary.v2.uploader.upload()
    const res = await cloudinary.uploader.upload(dataURI);
    // get the url from the cloudinary
    return res.url;
  });
  // get all the url using the Promise.all() its because it's an array
  const imageUrls = await Promise.all(uploadPromises);
  // return url 
  return imageUrls;
}

export default router;
