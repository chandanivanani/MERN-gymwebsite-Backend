import express from "express";
import workoutRoutes from "./workoutRoutes";
import authRoutes from "./authRoutes"
import userRoutes from "./userRoutes"
import blogRoutes from "./blogRoutes"
import recipeRoutes from "./recipeRoutes"
import progressRoutes from "./progressTrackRoutes"
import adminRoutes from "./adminRoutes"

const app = express();

app.use("/auth", authRoutes);
app.use("/workout",workoutRoutes)
app.use("/user",userRoutes)
app.use("/blog",blogRoutes)
app.use("/recipe",recipeRoutes)
app.use("/progress",progressRoutes)
app.use("/admin",adminRoutes)

export default app;