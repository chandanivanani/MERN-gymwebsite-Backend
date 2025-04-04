import { Request, Response } from "express";
import BlogModel from "../../models/blogModel";
import * as apiResponse from "../../helper/apiResponse";

const getAllBlogs = async (req:Request, res:Response):Promise<void> => {
    try {
        const page = parseInt(req.query?.page as string) || 1;
        const perPage = parseInt(req.query?.perPage as string) || 3;
        const query = req.query?.query 
        let blogQuery = BlogModel.find();

        //if search query is provided , add search filter to the query
        if(query) {
            blogQuery = blogQuery.or([
                { title: { $regex: query, $options: 'i'}}, //Case-insensitive search by title
                { category: { $regex: query, $options: 'i' }}
            ]);
        }

        // Execute the query with pagination
        const totalBlogs = await BlogModel.countDocuments(blogQuery);
        const blogs = await blogQuery
        .skip((page - 1) * perPage)
        .limit(perPage);

        if(blogs.length > 0) {
            apiResponse.successResponseWithData(res, "Blogs found", {
                blogs,
                currentPage: page,
                totalPages : Math.ceil(totalBlogs / perPage)
            });
        } else {
            apiResponse.notFoundResponse(res, "Blogs not found");
        }

    } catch (error) {
       apiResponse.errorResponseWithData(res, "Error in getting blogs",error);
       return;
 }
}
export default getAllBlogs;