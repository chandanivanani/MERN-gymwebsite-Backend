import { Request, Response } from "express";
import HealthyRecipesModel from "../../models/healthRecipe";
import * as apiResponse from "../../helper/apiResponse";

const deleteRecipe = async (req:Request, res:Response):Promise<void> => {
    try {
        const  id = req.params.id;
        const deletedRecipe = await HealthyRecipesModel.findByIdAndDelete(id);
        if(!deletedRecipe) {
            apiResponse.notFoundResponse(res, "Recipe not found");
            return;
        }
        apiResponse.successResponse(res, "Recipe deleted successfully");
    } catch (error) {
        apiResponse.errorResponseWithData(res, "Error in updating Recipe", error);
        return;
    }
}
export default deleteRecipe;