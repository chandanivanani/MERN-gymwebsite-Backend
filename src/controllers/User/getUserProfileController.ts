import {Request, Response} from "express";
import UserModel from "../../models/userModel";
import * as apiResponse from "../../helper/apiResponse";

const getUserProfileData = async (req:Request, res:Response): Promise<void> => {
    try {
        const userId = (req as any).user;
        // console.log(userId);
        const user = await UserModel.findById(userId).select("-password -role");

        if(user) {
            apiResponse.successResponseWithData(res, "User found", user);
            return;
        } else {
            apiResponse.notFoundResponse(res, "User not found");
            return;
        }
    } catch (err) {
        apiResponse.errorResponseWithData(res, "Error in getting user", err); 
        return;
    }
};

export default getUserProfileData;