import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";

interface AuthRequest extends Request {
  user?: string;
}

const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No user ID provided",
      });
    }

    const user = await UserModel.findById(userId);
    if (user?.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Admin access required",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default isAdmin;
