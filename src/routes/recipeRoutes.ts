import express from "express";

const recipe = express.Router()
recipe.post("/addrecipe")
recipe.get("/getrecipe")
recipe.get("/getrecipe/:id")
recipe.put("/updaterecipe/:id")
recipe.delete("/deleterecipe/:id")

export default recipe;