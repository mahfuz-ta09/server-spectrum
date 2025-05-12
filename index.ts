require('dotenv').config()
import { Request, Response } from 'express'
import { corsOptions } from "./config/corsOption"
import { trackRequest } from "./middleware/trackRequest"
const express = require('express')
const app = express()
const cors = require('cors')
var cookieParser = require('cookie-parser')
const { connectDb } = require("./config/connectDB")
const route = require('./routes/route')
const port = process.env.PORT || 5000


connectDb()
app.use(trackRequest())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use(cookieParser(process.env.PARSE_SECRET))

app.use('/app/api', route)

app.get('/', (req:Request, res: Response) => {
    res.status(200).json({
        message:'Spectrum server responding fine'
    })
})


app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'The requested resource does not exist'
    });
});

app.listen(port, () => {
    console.log(`Spectrum server listening on port ${port}`)
})