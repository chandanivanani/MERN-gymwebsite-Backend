import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import BlogModel from "../../models/blogModel";
import { upload } from "../../helper/multerConfig";
import schemaValidator from "../../middleware/schemaValidator";

const addBlog = [
    upload.single('coverImg'),
    schemaValidator('/addblog'),

    async (req:Request, res:Response):Promise<void> => {
        const {
            title,
            content,
            author,
            category,
            readtime,
            subtitle
        } = req.body;
        try {
            const blog = await BlogModel.create({
                title,
                content:JSON.parse(content),
                author,
                category,
                readtime,
                subtitle,
                coverImg: req.file?.path,
            });
            blog.save();

            if(blog) {
                apiResponse.successResponse(res,"new blog added");
                return;
            }

        }
        catch (error) {
            console.log(error);
            apiResponse.errorResponse(res, "blog not added");

        }
    }
]

export default addBlog;