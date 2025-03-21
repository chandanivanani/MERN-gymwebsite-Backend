import { Request, Response } from 'express';
import * as apiResponse from '../../helper/apiResponse';
import UserModel from '../../models/userModel';
import { encryptPass } from '../../helper/passEncDes';

const Signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstname, lastname, email, password, gender, dob, height, weight, bio, profilePhoto } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            apiResponse.AlreadyExists(res, "User already exists");
            return;
        }

        // Encrypt password
        const hashedPassword = await encryptPass(password);

        // Create new user
        const user = new UserModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            gender: gender || '',
            dob: dob || '',
            height: height || '',
            weight: weight || '',
            bio: bio || '',
            profilePhoto: profilePhoto || ''
        });

        await user.save(); // Save user to the database

        apiResponse.successResponse(res, "User added successfully");
    } catch (err) {
        console.error("Signup Error:", err);
        apiResponse.errorResponse(res, "User not added");
    }
};

export default Signup;