const { MongoClient } = require("mongodb")


const uri = process.env.CONNECTION_STRING;
if (!uri) {
  throw new Error("❌ CONNECTION_STRING environment variable is not defined.");
}

let client
let db:any
let isConnected = false

const connectDb = async() =>{
    try{
        if(isConnected && db){
            console.log("Already connected to database.")
            return db
        }

        const client = new MongoClient(uri)
        await client.connect()
        db = client.db()

        isConnected = true
        console.log("Database connected successfully!!")
        return db
    }catch(err){
        throw err
    }
}  

const getDB = () =>{
    if(!db){
        throw new Error("❌ Database connection not established.")
    }

    return db
}


module.exports = {
    connectDb,
    getDB
}