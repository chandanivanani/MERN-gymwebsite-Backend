import mongoose,{Document} from "mongoose";

export interface NutritionFacts {
    calories: number;
    carbohydrates: number;
    protein: number;
    totalfat: number;
}

export interface Ingredient {
    name: string;
    quantity: string;
    unit:string;
}

export interface HealthyRecipes extends Document{
    title: string;
    description? :string;
    mealType?: string;
    dietaryType?: string;
    prepTime: number;
    cookTime: number;
    nutritionFacts:NutritionFacts;
    ingredients: Ingredient[];
    instructions: string[];
    image: string;
}

const HealthyRecipesSchema = new mongoose.Schema<HealthyRecipes>({
     title:{ type:String, required:true },
     description:{ type:String, required:true },
     mealType:{ type:String, required:true },
     dietaryType:{ type:String, required:true },
     prepTime:{ type:Number, required:true },
     cookTime:{ type:Number, required: true },
     nutritionFacts:{ 
        calories:{type:Number, required:true },
        carbohydrates: { type:Number, required:true },
        protein: { type:Number, required: true },
        totalfat: { type:Number, required: true },
     },
     ingredients:[{
        name: {type:String, required:true },
        quantity: {type: String, required:true },
        unit:{type: String},
     }],
     instructions:{ type: [String], required:true},
     image:{ type:String },
});

const HealthyRecipesModel = mongoose.model<HealthyRecipes>("HealthyRecipes",HealthyRecipesSchema);

export default HealthyRecipesModel;