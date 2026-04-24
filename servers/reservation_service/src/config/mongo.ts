import mongoose from "mongoose"

export async function connectDatabase() {

    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/sudokio-admin"

    try {

        await mongoose.connect(uri)

        console.log("MongoDB connected")

    } catch (error) {

        console.error("MongoDB connection error", error)

        process.exit(1)

    }

}