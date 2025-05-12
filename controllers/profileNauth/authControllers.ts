import { Request, Response } from "express"
import { sendResponse } from "../../utils/sendResponse"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getDB } = require('../../config/connectDB')
import { format } from "date-fns"

const emaiReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const signin = async( req: Request , res: Response) =>{
    try{
        const db = getDB()
        const usersCollection = db.collection('users')

        const { name , email , photo , phone , provider , password} = req.body
        
        if(emaiReg.test(email) === false){
            return sendResponse(res,{
                message:"Invalid email format",
                status:500,
                success:false
            })
        }

        if( !email || !provider ){
            return sendResponse(res,{
                message:"No empty field allowed!",
                status:500,
                success:false
            })
        }

        const query = { email : email }
        const user = await usersCollection.findOne(query)

        
        if(user && provider==='custom' && user.provider==='google'){
            return sendResponse(res,{
                message:"You have already used google account!",
                status:500,
                success:false
            })
        }

        if(!user && provider==='custom'){
            return sendResponse(res,{
                message:"No user exist, create account or login with google!",
                status:500,
                success:false
            })
        }

        let inserted
        if(!user && provider === 'google'){
            
            const newUser = {
                name: name,
                email: email,
                photo: photo,
                provider: provider,
                phone:phone,
                role:"user",
                password:'',
                isVerified: true,
                createdAt: format(new Date(), "dd/mm/yyyy"),
                editedAt: "",
            }

            // let hashedPass
            // if(provider === 'custom'){
            //     hashedPass = await bcrypt.hash(password,10)
            // }
            // newUser.password=hashedPass

            inserted = await usersCollection.insertOne(newUser)

        }

        if(user && provider==='custom'){
            const matched = await bcrypt.compare(password, user.password)
            if(!matched){
                return sendResponse(res,{
                    message:"No user exist, create account or login with google!",
                    status:500,
                    success:false
                })
            }
        }
        if(!user && !inserted.insertedId){
            return sendResponse(res,{
                success: false,
                status:500,
                message: "Failed to login or user does not exist",
            })
        }

        const userProfile = {
            email: email,
            role: 'user'
        }
        
        const accessToken = jwt.sign({ userProfile }, process.env.ACCESS_TOKEN)
        const refreshToken = jwt.sign({ userProfile },process.env.REFRESH_TOKEN)
        
        res.cookie('accessToken',accessToken,{
            maxAge:7 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        })
        
        res.cookie('refreshToken',refreshToken,{
            maxAge:7 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        })
        

        sendResponse(res,{
            success: true,
            message: "Login successful",
            status:200,
            meta:{
                accessToken: 5
            }
        })
    }catch(err){
        console.log(err)
    }
}

const signup = ( req: Request , res: Response) =>{

}

const logout = ( req: Request , res: Response) =>{

}

const verifySignup = ( req: Request , res: Response) =>{

}

const accessToken = ( req: Request , res: Response) =>{

}

module.exports = {
    signin,
    signup,
    logout,
    verifySignup,
    accessToken
}