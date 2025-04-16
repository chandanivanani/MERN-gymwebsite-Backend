import { Request, Response } from "express";
import HealthyRecipesModel from "../../models/healthRecipe";
import * as apiResponse from "../../helper/apiResponse";

const getRecipeById = async (req:Request, res:Response):Promise<void> => {
    const id = req.params.id;
    try {
        const recipe = await HealthyRecipesModel.findById(id);
        if(recipe) {
            apiResponse.successResponseWithData(res, "recipe found", recipe);
        }
        else {
            apiResponse.notFoundResponse(res, "recipe not found");
            return;
        }
    } catch (error) {
        apiResponse.errorResponseWithData(res, "Error in getting recipe", error);
        return;
    }
}

export default getRecipeById;