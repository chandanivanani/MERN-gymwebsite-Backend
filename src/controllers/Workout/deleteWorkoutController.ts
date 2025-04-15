import { Request, Response } from 'express';
import WorkoutModel from '../../models/workoutModel';
import * as apiResponse from "../../helper/apiResponse";

const deleteWorkout = async (req:Request, res:Response):Promise<void> => {
    try {
        const id = req.params.id;
        const deletedWorkout = await WorkoutModel.findByIdAndDelete(id);
        if(!deletedWorkout){
            apiResponse.notFoundResponse(res, "Workout not found");
            return;
        }
        apiResponse.successResponse(res, "Workout deleted successfully");
    } catch (error) {
        apiResponse.errorResponseWithData(res, "Error in updating Workout",error);
    }
}

export default deleteWorkout;