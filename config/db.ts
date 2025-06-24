import mongoose from "mongoose";


export const connect_db = async () => {
    try{
        await mongoose.connect(process.env.CONNECTION_STRING!);
        console.log("Successfully connected to the database.");
    }catch(e){
        console.log('An error occurred while connecting to the database.')
    }
}