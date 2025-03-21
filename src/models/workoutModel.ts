import { title } from 'process';
import mongoose,{ Document } from 'mongoose';

interface Workout extends Document{
    title:string,
    category:string,
    subcategory:string,
    explanation:string,
    difficultyLevel:string,
    equipment:string,
    thumbnail:string,
    videoUrl:string
}

const workoutSchema = new mongoose.Schema<Workout>({
    title: {type: String, required: true},
    category:{ type: String, required: true},
    subcategory:{ type: String },
    explanation:{ type: String , required: true},
    difficultyLevel:{ type:String , required: true},
    equipment:{ type: String },
    thumbnail:{ type: String, required: true},
    videoUrl:{ type: String , required: true}
});

const WorkoutModel = mongoose.model<Workout>('Workout',workoutSchema);

export default WorkoutModel;
