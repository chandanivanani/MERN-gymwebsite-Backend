import express from "express"

const blog = express.Router();

blog.post("/addblog")
blog.get("/getblog")
blog.get("/getblog/:id")
blog.put("/updateblog/:id")
blog.delete("/deleteblog/:id")

export default blog;
