import { Request, Response } from "express";
import BlogModel from "../../models/blogModel";
import * as apiResponse from "../../helper/apiResponse";

const getBlogById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const blog = await BlogModel.findById(id);
    if (blog) {
      apiResponse.successResponseWithData(res, "blog found", blog);
    } else {
      apiResponse.notFoundResponse(res, "blog not found");
      return;
    }
  } catch (err) {
    apiResponse.errorResponseWithData(res, "Error in getting blog", err);
    return;
  }
};

export default getBlogById;
