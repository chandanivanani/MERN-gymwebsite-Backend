import express from "express";
import verifyToken from "../middleware/tokenValidation";
import addWorkout from "../controllers/Workout/addWorkoutController";
import getAllWorkout from "../controllers/Workout/getAllWorkoutController";
import getWorkoutById from "../controllers/Workout/getWorkoutByIdController";
import getFilterData from "../controllers/Workout/getFilterDataController";
import updateWorkout from "../controllers/Workout/updateWorkoutController";
import deleteWorkout from "../controllers/Workout/deleteWorkoutController";

const workout = express.Router();

workout.post('/addworkout', verifyToken, addWorkout);
workout.get('/getworkout', verifyToken, getAllWorkout);
workout.get('/getworkout/:id', verifyToken, getWorkoutById);
workout.get('/getfilterdata', verifyToken, getFilterData);
workout.put('/updateworkout/:id', verifyToken, updateWorkout);
workout.delete('/deleteworkout/:id', verifyToken, deleteWorkout);

export default workout;