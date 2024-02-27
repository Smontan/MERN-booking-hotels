import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middelware/auth";
import { body } from "express-validator";

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
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        // get the url from the cloudinary
        return res.url;
      });

      // if the upload is successfull it will return a URL and add the URL to the newHotel constant
      const imageUrls = await Promise.all(uploadPromises);
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

// /api/my-hotels
router.get("/", verifyToken, async(req: Request, res: Response) => {
  const userId = req.userId
  try {
    const hotels = await Hotel.find({userId});
    res.status(200).json(hotels)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error fetching hotels"})
    
  }
})

export default router;
