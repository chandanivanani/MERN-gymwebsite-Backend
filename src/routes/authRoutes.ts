import express from "express";
import SignUp from "../controllers/Auth/signupController";
import Login from "../controllers/Auth/loginController";
import ForgotPassword from "../controllers/Auth/forgotController";
import schemaValidator from "../middleware/schemaValidator";
import refreshController from "../controllers/Auth/refreshToken";

const auth = express.Router();

auth.post("/signup",schemaValidator("/signup"), SignUp)
auth.post('/login', schemaValidator('/login'), Login)
auth.post('/forgot',schemaValidator('/forgot'), ForgotPassword)
auth.get('/refresh',refreshController)

export default auth;