import express from "express";

const user = express.Router();

user.get('/profile')
user.put('/updatedata')
user.put('/uploadphoto')
user.delete('/deletephoto')

export default user;