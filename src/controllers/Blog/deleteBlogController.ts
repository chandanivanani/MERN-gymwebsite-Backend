import { Request, Response } from 'express';
import BlogModel from '../../models/blogModel';
import * as apiResponse from '../../helper/apiResponse';

const deleteBlog = async (req: Request, res:Response): Promise <void> => {
    try {
        const id = req.params.id;
        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        if(!deletedBlog) {
            apiResponse.notFoundResponse(res, "Blog not found");
            return;
        }
        apiResponse.successResponse(res, "Blog deleted successfully");
    } catch (error) {
        apiResponse.errorResponseWithData(res, "Error in updating Blog", error);
        return;
    }
}

export default deleteBlog;