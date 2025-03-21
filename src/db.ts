import mongoose from "mongoose";
import logger from "./helper/logger";

const connection = async () : Promise<void> => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/fitness-app-1');
        logger.info('Connected to MongoDB');
        console.log(`Connected to MongoDB database: ${mongoose.connection.db?.databaseName}`);

    } catch (error) {
        console.error("Mongodb connection error:",error);
    }
};
export default connection;