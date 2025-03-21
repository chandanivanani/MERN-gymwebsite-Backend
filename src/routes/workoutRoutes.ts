import express from "express";

const workout = express.Router()

workout.post('/addworkout')
workout.get('/getworkout')
workout.get('/getworkout/:id')
workout.get('/getfilterdata')
workout.put('/updateworkout/:id')
workout.delete('/deleteworkout/:id')

export default workout;