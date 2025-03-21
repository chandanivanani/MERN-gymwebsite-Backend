import { Request, Response } from 'express';
import * as apiResponse from '../../helper/apiResponse';
import UserModel from '../../models/userModel';
import { encryptPass } from '../../helper/passEncDes';

const ForgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            apiResponse.errorResponse(res, 'Invalid email');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            apiResponse.errorResponse(res, 'Password and Confirm Password do not match');
            return;
        }

        // Encrypt the new password
        const hashedPassword = await encryptPass(password);

        // Update the password in the database
        await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        apiResponse.successResponse(res, 'Password changed successfully');
    } catch (error) {
        console.error('Forgot Password Error:', error);
        apiResponse.errorResponse(res, 'An error occurred while changing the password');
    }
};

export default ForgotPassword;
