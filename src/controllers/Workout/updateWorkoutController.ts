import { successResponseWithData } from './../../helper/apiResponse';
import { Request, Response } from 'express';
import * as apiResponse from '../../helper/apiResponse';
import WorkoutModel from '../../models/workoutModel';
import { upload } from '../../helper/multerConfig';

const updateWorkout = [
    upload.single("thumbnail"),
    async (req: Request, res: Response):Promise<void> => {
        try {
            const id = req.params.id;
            const {
              title,
              category,
              subCategory,
              explanation,
              difficultyLevel,
              videoUrl,
              equipment
            } = req.body;

            const workout = await WorkoutModel.findByIdAndUpdate(id, {
                title,
                category,
                subCategory,
                explanation,
                difficultyLevel,
                thumbnail:req.file?.path,
                videoUrl,
                equipment
            }, {new:true});

            if(!workout) {
                apiResponse.notFoundResponse(res, "Workout not found");
                return;
            }
            
            // save updated user
            await workout.save();

            apiResponse.successResponseWithData(res, "Workout updated successfully",workout);
        } catch (error) {
            apiResponse.errorResponseWithData(res, "Error in updating workout",error);
            return;
        }
    }
];

export default updateWorkout;