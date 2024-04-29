import mongoose from "mongoose"

//since we are using development mode , whenever we refresh, this will make new connection 
//to prevent this-
const connection = {};

export const connectToDB = async () => {
    try {
        if( connection.isConnected) {
            console.log("using existing connection");
            return;
        }
        
        const db = await mongoose.connect(process.env.MONGO_URL, {

        });

        connection.isConnected = db.connections[0].readyState;
    }
    catch(err) {
        console.error(err.message);
        // throw new Error("Error connecting to db")
    }
    
}