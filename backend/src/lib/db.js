import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_CONN_URL);
        console.log("MONGODB Connected")
    }
    catch(error){
        console.log("Error connecting MONGODB: ", error.message);
    }
}