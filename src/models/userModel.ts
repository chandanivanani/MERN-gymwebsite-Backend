import mongoose,{Document} from "mongoose";

interface User extends Document {
    firstName: string;
    lastname: string;
    email:string;
    password:string;
    profilePhoto:string | null;
    gender: string;
    height? : number;
    role?:number;
    weight?:number;
    bio:string;
}

const userSchema = new mongoose.Schema<User>({
    firstName: { type:String, required: true },
    lastname:{type: String, required:true },
    email: { type:String, required:true, unique:true},
    password: {type: String, required:true},
    gender:{type:String},
    profilePhoto: {type:String},
    height:{type:Number},
    role:{type:Number, default:0},
    weight: {type:Number},
    bio:{type:String}
});

const UserModel = mongoose.model<User>('User',userSchema);

export default UserModel;