import express from "express"
import verifyToken from "../middleware/tokenValidation";
import addBlogController from "../controllers/Blog/addBlogController";
import getAllBlogs from "../controllers/Blog/getAllBlogsController";

const blog = express.Router();

blog.post("/addblog",verifyToken, addBlogController);
blog.get("/getblog",verifyToken, getAllBlogs)
blog.get("/getblog/:id",verifyToken)
blog.put("/updateblog/:id",verifyToken)
blog.delete("/deleteblog/:id",verifyToken)

export default blog;
