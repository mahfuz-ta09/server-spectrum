const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string
let uri = process.env.CONNECTION_STRING
let db:any
let isConnected = false

const connectDb = async() =>{
    try{
        if(isConnected && db){
            console.log("Connection already exist!")
            return db
        }

        const client = new MongoClient(uri)
        await client.db()
        db = client.db()

        isConnected = true
        console.log("Database connected successfully!!")
        return db
    }catch(err){
        console.log("Error connected database",err)
    }
}  

const getDB = () =>{
    if(!db){
        console.log("Connection yetnot established!")
    }

    return db
}


module.exports = {
    connectDb,
    getDB
}