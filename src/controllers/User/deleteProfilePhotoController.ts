import { Request, Response} from "express";
import UserModel from "../../models/userModel";
import * as apiResponse from "../../helper/apiResponse";

const deleteImage = async (req:Request, res:Response): Promise<void> => {
    try {
        const userId = (req as any).user;
        const user = await UserModel.findById(userId);

        if(!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.profilePhoto = null;
        await user.save();

        apiResponse.successResponseWithData(res, "Profile photo deleted successfully", user);
    } catch (error) {
        apiResponse.errorResponse(res, "Error deleting profile photo");
        return;
    }
}

export default deleteImage;