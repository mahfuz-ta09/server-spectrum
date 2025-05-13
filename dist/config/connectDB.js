"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { MongoClient } = require("mongodb");
let uri = process.env.CONNECTION_STRING;
let db;
let isConnected = false;
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isConnected && db) {
            console.log("Connection already exist!");
            return db;
        }
        const client = new MongoClient(uri);
        yield client.db();
        db = client.db();
        isConnected = true;
        console.log("Database connected successfully!!");
        return db;
    }
    catch (err) {
        console.log("Error connected database", err);
    }
});
const getDB = () => {
    if (!db) {
        console.log("Connection yet not established!");
    }
    return db;
};
module.exports = {
    connectDb,
    getDB
};
