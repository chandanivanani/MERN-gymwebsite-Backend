import { Request, Response} from "express";
import BlogModel from "../../models/blogModel";
import * as apiResponse from "../../helper/apiResponse";
import { upload } from "../../helper/multerConfig";

const updateBlog = [
    upload.single('coverImg'),

    async (req: Request,res: Response):Promise<void> => {
        try {
            const id = req.params.id;
            const {
                title,
                content,
                author,
                category,
                readtime,
                subtitle,
            } = req.body;

            const blog = await BlogModel.findByIdAndUpdate(id, {
                 title,
                 content:JSON.parse(content),
                 author,
                    category,
                    coverImg: req.file?.path,
                    readtime,
                    subtitle
            }, {new: true} );

            if(!blog) {
                apiResponse.notFoundResponse(res, "Blog not found");
                return;
            }

            await blog.save();
            apiResponse.successResponseWithData(res, "Blog updated successfully", blog);
        } catch (error) {
           apiResponse.errorResponseWithData(res, "Error in updating Blog",error); 
           return;
        }
    }
]

export default updateBlog;