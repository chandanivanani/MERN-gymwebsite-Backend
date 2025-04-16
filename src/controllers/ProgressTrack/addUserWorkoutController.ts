import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import UserWorkoutModel from "../../models/progressTrack/userWorkoutModel";

const addUserWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user;
    const { targetDays, duration, title, workoutId, startDate } = req.body;
    const endDate = new Date(startDate);

    //Add targetDays to endDate based on workout type
    endDate.setDate(endDate.getDate() + (parseInt(targetDays) - 1));

    //Define common properties for both types of workouts
    const commonProperties = {
      userId,
      targetDays,
      duration,
      startDate,
      endDate,
      workoutType: workoutId ? "predefined" : "custom"
    };

    //create a new workout based on workout type
    const newWorkout = workoutId
      ? await UserWorkoutModel.create({ ...commonProperties, workoutId }) //Predefined workout
      : await UserWorkoutModel.create({ ...commonProperties, title }); //Custom workout

    if (newWorkout) {
      apiResponse.successResponse(res, "Workout added");
      return;
    }
  } catch (error) {
    apiResponse.errorResponse(res, "Workout not added");
  }
};
export default addUserWorkout;