import { Request, Response } from 'express';
import * as apiResponse from '../../helper/apiResponse';
import UserModel from '../../models/userModel';
import { comparePass } from '../../helper/passEncDes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as string;

const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            apiResponse.errorResponse(res, 'Invalid email or password');
            return;
        }

        // Verify password
        const isPasswordMatch = await comparePass(password, user.password as string);
        if (!isPasswordMatch) {
            apiResponse.errorResponse(res, 'Invalid email or password');
            return;
        }

        // Generate Access Token (short-lived)
        //  const accessToken = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' });

        // Generate Refresh Token (long-lived)
        const refreshToken = jwt.sign({ id: user._id }, jwtRefreshSecret, { expiresIn: '7d' });

        // Set Refresh Token as HTTP-Only Cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        // Send response with Access Token
        apiResponse.sendToken(res, 200, user) 
    
    } catch (error) {
        console.error("Login Error:", error);
        apiResponse.errorResponse(res, 'User not found');
    }
};

export default Login;
