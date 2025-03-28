import  {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import * as apiResponse from "../helper/apiResponse";
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

interface customRequest extends Request {
    user? : string;
}

const verifyToken = (req:customRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            apiResponse.errorResponse(res, "Authorization header is missing");
            return;
        } 
        
        const token = authHeader.split(' ')[1];
        if(!token){
            apiResponse.errorResponse(res, "Token is missing");
            return;
        }

        jwt.verify(token, jwtSecret as string ,(err:any, decoded:any) => {
            if (err) {
                apiResponse.unauthorizedResponse(res, "Token is not valid");
                return;
            }

            req.user = decoded.id;
            next();
        });
    } catch (error) {
        apiResponse.errorResponse(res, "Internal server error");
        return;
    }
};

export default verifyToken;