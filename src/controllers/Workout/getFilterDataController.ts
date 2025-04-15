import { Request, Response} from "express";
import * as apiResponse from "../../helper/apiResponse";
import WorkoutModel from "../../models/workoutModel";

const getFilterData = async (req:Request, res:Response) :Promise<void> => {
    try {
        const categories = await WorkoutModel.distinct('category');
        const subcategories = await WorkoutModel.distinct('subCategory');
        const difficultyLevels = await WorkoutModel.distinct('difficultyLevel');
        if(categories && subcategories && difficultyLevels) {
            apiResponse.successResponseWithData(res, "Filterdata found", { categories, subcategories, difficultyLevels})
        }
        else {
            apiResponse.notFoundResponse(res, "filterdata not found");
            return;
        }
    } catch (error) {
          apiResponse.errorResponseWithData(res, "Error in getting filterdata", error);
          return; 
    }
}

export default getFilterData;