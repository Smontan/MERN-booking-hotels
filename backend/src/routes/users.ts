import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register
router.post(
  "/register",
  [
    check("email", "Email is invalid").isEmail(),
    check("firstName", "Firstname is required").isString(),
    check("lastName", "Lastname is required").isString(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });

      // Search inside of our database if this email already exist
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Save new user if the credentials are valid
      user = new User(req.body);
      await user.save();

      // After we save the new user we'll create json web token and cookie
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === "production",
        maxAge: 86400000,
      });
      // return res.status(200).json({message: "Register successfully"});
      return res.status(200).send({ message: "Register a user successfully"})
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
 