/*
import mongoose from "mongoose";

class  DBService{
    static instance;

    static getInstance() {
        if(!DBService.instance){
            DBService.instance = new DBService();
        }
        return DBService.instance;
    }

    async connect() {
        const username = process.name.MONGO_USER;
        const password = process.env.MONGO_PASSWORD;
        const host = process.env.MONGO_HOST;
        const port = process.env.MONGO_PORT;
        const db = process.env.MONGO_DB;

        if (!username || !password || !host || !port || !db) {

            throw new Error("Missing DB config values");

        }
        const uri = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${db}?authSource=${db}`;

        try{
            await mongoose.connect(uri);
            console.log("Connected to MongoDB");
        }catch(err){
            console.error("MongoDB connection error:", err);
        }
    }
}

export default DBService;
*/