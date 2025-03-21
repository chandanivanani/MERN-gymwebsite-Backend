import {Request, Response} from 'express';
import * as apiResponse from '../../helper/apiResponse';
import  jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as string;
const jwtSecret = process.env.JWT_SECRET as string;

const refreshTokenGenerate = async(req:Request, res: Response): Promise<void> => {
    try {
        const cookies = await req.cookies;
        
        if(!cookies?.refreshToken) {
             apiResponse.unauthorizedResponse(res, "Access denied, No refresh token provided");
             return;
        } 

    const refreshToken= cookies.refreshToken;
   
     jwt.verify(
        refreshToken,
        jwtRefreshSecret,
        (err: any , decoded: any) => {
            if(err) {
                return apiResponse.unauthorizedResponse(res, "Refresh token is not valid");
            }

            const token = jwt.sign({id:decoded.id}, jwtSecret as string, {expiresIn: '1d'});

            return apiResponse.successResponseWithData(res, 'new accesstoken', token)
        });
} catch (error) {

apiResponse.errorResponse(res, "Internal server Error");
}
};
export default refreshTokenGenerate;