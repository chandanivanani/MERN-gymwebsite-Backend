import Joi, {ObjectSchema} from "joi";

const PASSWORD_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const authSignup = Joi.object().keys({
    email: Joi.string().email().required(),
    firstname: Joi.string().min(3).max(30).required(),
    lastname:Joi.string().min(2).max(30).required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
    refreshToken: Joi.string().allow('').optional(),
});

const authLogin = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const authForgotPass = Joi.object().keys({
    email:Joi.string().required(),
    password:Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
})

const addWorkout = Joi.object().keys({
    title:Joi.string().required(),
    category:Joi.string().required(),
    subcategory:Joi.string().allow('').optional(),
    explanation:Joi.string().required(),
    difficultyLevel:Joi.string().required(),
    // thumbnail:Joi.string().required(),
    equipment:Joi.string().allow('').optional(),
    videoURL:Joi.string().required(),
})

const addBlog = Joi.object().keys({
    title:Joi.string().required(),
    subtitle:Joi.string().allow('').optional(),
    content : Joi.string().required(),
    author:Joi.string().required(),
    category:Joi.string().required(),
    readtime:Joi.string().required()
})

const addRecipe = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    mealtype:Joi.string().required(),
    dieatrytype:Joi.string().required(),
    preptime:Joi.number().required(),
    cooktime:Joi.number().required(),
    nutritionfacts:Joi.string().required(),
    ingredients:Joi.string().required(),
    instructions:Joi.string().required(),
})

export default {
    "/login": authLogin,
    "/signup": authSignup,
    "/addworkout":addWorkout,
     "/addblog"  :addBlog,
     "/addrecipe":addRecipe,
     "/forgot":authForgotPass
} as { [key: string] : ObjectSchema};