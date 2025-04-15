import { Request, Response } from "express";
import WorkoutModel from "../../models/workoutModel";
import * as apiResponse from "../../helper/apiResponse";

const getWorkoutById = async (req:Request, res:Response) :Promise<void> => {
    const id = req.params.id;
    try {
        const workout = await WorkoutModel.findById(id);
        if(workout) {
            apiResponse.successResponseWithData(res, "workout found", workout)
        }
        else {
            apiResponse.notFoundResponse(res, "workout not found");
            return;
        }
    } catch (error) {
        apiResponse.errorResponseWithData(res, "Error in getting workouts", error);
        return;
    }
}

export default getWorkoutById;