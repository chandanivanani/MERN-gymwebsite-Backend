import mongoose,{Document} from "mongoose";

interface Blog extends Document {
    title:string;
    subtitle:string;
    content:string[];
    author:string;
    category:string;
    coverImg:string;
    readtime:number;
}

const blogSchema = new mongoose.Schema<Blog>({
    title:{type:String, required:true},
    subtitle:{ type: String},
    content:{ type:[String], required:true},
    author:{ type: String, required:true},
    category:{ type: String, required:true},
    coverImg:{ type: String, required:true},
    readtime:{ type: Number, required:true }
});

const BlogModel = mongoose.model<Blog>('Blog',blogSchema);

export default BlogModel;