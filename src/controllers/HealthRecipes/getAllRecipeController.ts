import { Request, Response } from "express";
import HealthyRecipesModel from "../../models/healthRecipe";
import * as apiResponse from "../../helper/apiResponse";

const getAllRecipes = async (req:Request, res:Response):Promise<void> => {
    try {
        const page = parseInt(req.query?.page as string) || 1;
        const perPage = parseInt(req.query?.perPage as string) || 3;
        const query = req.query?.query as string || '';

        let recipeQuery = HealthyRecipesModel.find();

        if(query) {
            recipeQuery = recipeQuery.or([
                {title: { $regex: query, $options: 'i' } },
                { mealType: { $regex: query, $options: 'i' } },
                { dietaryType: { $regex: query , $options: 'i' } },
            ]);
        }

        const totalRecipe = await HealthyRecipesModel.countDocuments(recipeQuery);

        const recipes = await recipeQuery
              .skip((page - 1) * perPage)
              .limit(perPage);

              if(recipes.length > 0) {
                apiResponse.successResponseWithData(res, "Recipe found", {
                    recipes,
                      currentPage: page,
                      totalPages: Math.ceil(totalRecipe / perPage)
                });
              } else {
                apiResponse.notFoundResponse(res, "Recipe not found");
              }
    } catch (error) {
        apiResponse.errorResponseWithData(res, "Error in getting recipes", error);
        return;
    }
}

export default getAllRecipes;