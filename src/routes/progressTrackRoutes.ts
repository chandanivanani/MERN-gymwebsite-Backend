import express from "express"

const progress = express.Router();

progress.get("/gettabledata")
progress.get("/getchartdata")
progress.get("/getcarddata")
progress.post("/adduserworkout")
progress.put("/updateCompletionStatus")
progress.put("/updatetabledata/:id")
progress.delete("/deletetabledata/:id")


export default progress;