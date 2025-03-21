import mongoose,{Schema, Document} from "mongoose";

// Define a combined interface for both types of workouts
interface UserWorkout extends Document{
    userId : mongoose.Types.ObjectId;
    workoutId? : mongoose.Types.ObjectId;//only present for predefinedWorkout
    title: string;//only present for custom workou
    targetDays: number;
    completedDays:number;
    duration:number;
    startDate:Date;
    endDate: Date;
    workoutType:string;
    completionStatus:{
        date:Date;
        checked:boolean;
    }[];
}

// Define a Mongoose schema for the combined Workout interface
const userWorkoutSchema = new mongoose.Schema<UserWorkout>({
    userId:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
    workoutId:{ type: Schema.Types.ObjectId, ref: 'Workout' }, //Only present for PredefineWorkout
    title:{ type: String }, //Only present for CustomWorkout
    targetDays:{ type:Number , required:true},
    completedDays:{ type: Number, default:0 },
    duration:{ type: Number , required:true},
    startDate:{ type: Date},
    endDate:{ type: Date },
    workoutType:{ type: String, enum: ['custom', 'predefined'] },
    completionStatus:[{
        date: { type:Date, default: new Date() },
        checked: {type: Boolean , default: false}
    }]
});

// Define a Mongoose model for the combined schema
const UserWorkoutModel = mongoose.model<UserWorkout>('UserWorkout',userWorkoutSchema);

export default UserWorkoutModel;