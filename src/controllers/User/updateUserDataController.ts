import { Request,Response } from "express";
import UserModel from "../../models/userModel";
import * as apiResponse from "../../helper/apiResponse";

const updateUserData = async (req:Request, res:Response) :Promise<void> => {
    try {
        const userId = (req as any).user;
        const {
            firstname,
            lastname,
            email,
            gender,
            height,
            role,
            dob,
            weight,
            bio,
        } = req.body;
        
        const user = await UserModel.findByIdAndUpdate(userId, {
            firstname,
            lastname,
            email,
            gender,
            height,
            role,
            dob,
            weight,
            bio
        }, {new:true} );
        if(!user) {
            apiResponse.notFoundResponse(res, "User not found");
            return;
        }

        //save updated user
        await user?.save();

        //Respond with updated user data 
        apiResponse.successResponseWithData(res,"User updated successfully", user);
    } catch (error) {
        console.log("error in updating user:",error);
        apiResponse.errorResponseWithData(res, "Error in updating user", error);
        return;
    }
};

export default updateUserData;