import express from "express";
import getUserProfileData from "../controllers/User/getUserProfileController";
import verifyToken from "../middleware/tokenValidation";
import updateUserData from "../controllers/User/updateUserDataController";
import uploadProfilePhoto from "../controllers/User/uploadProfilePhoto";
import deleteImage from "../controllers/User/deleteProfilePhotoController";

const user = express.Router();

user.get('/profile', verifyToken , getUserProfileData)
user.put('/updatedata', verifyToken , updateUserData)
user.put('/uploadphoto', verifyToken , uploadProfilePhoto)
user.delete('/deletephoto', verifyToken, deleteImage)

export default user;