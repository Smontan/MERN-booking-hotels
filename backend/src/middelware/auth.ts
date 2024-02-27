import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

declare global  {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
  const token =  req.cookies["auth_token"]

  if(!token) return res.status(401).json({ message: "Unathorized"})

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    if(!decoded) return res.status(401).json({ message: "Token not verified"})

    req.userId = (decoded as JwtPayload).userId;

    next()
  } catch (error) {
    return res.status(401).json({ message: "Unathorized"})
    
  }
}

export default verifyToken;