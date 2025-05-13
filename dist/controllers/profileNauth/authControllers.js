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
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse_1 = require("../../utils/sendResponse");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../../config/connectDB');
const date_fns_1 = require("date-fns");
const emaiReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = getDB();
        const usersCollection = db.collection('users');
        const { name, email, photo, phone, provider, password } = req.body;
        if (emaiReg.test(email) === false) {
            return (0, sendResponse_1.sendResponse)(res, {
                message: "Invalid email format",
                status: 500,
                success: false
            });
        }
        if (!email || !provider) {
            return (0, sendResponse_1.sendResponse)(res, {
                message: "No empty field allowed!",
                status: 500,
                success: false
            });
        }
        const query = { email: email };
        const user = yield usersCollection.findOne(query);
        if (user && provider === 'custom' && user.provider === 'google') {
            return (0, sendResponse_1.sendResponse)(res, {
                message: "You have already used google account!",
                status: 500,
                success: false
            });
        }
        if (!user && provider === 'custom') {
            return (0, sendResponse_1.sendResponse)(res, {
                message: "No user exist, create account or login with google!",
                status: 500,
                success: false
            });
        }
        let inserted;
        if (!user && provider === 'google') {
            const newUser = {
                name: name,
                email: email,
                photo: photo,
                provider: provider,
                phone: phone,
                role: "user",
                password: '',
                isVerified: true,
                createdAt: (0, date_fns_1.format)(new Date(), "dd/mm/yyyy"),
                editedAt: "",
            };
            inserted = yield usersCollection.insertOne(newUser);
        }
        if (user && provider === 'custom') {
            const matched = yield bcrypt.compare(password, user.password);
            if (!matched) {
                return (0, sendResponse_1.sendResponse)(res, {
                    message: "No user exist, create account or login with google!",
                    status: 500,
                    success: false
                });
            }
        }
        if (!user && !inserted.insertedId) {
            return (0, sendResponse_1.sendResponse)(res, {
                success: false,
                status: 500,
                message: "Failed to login or user does not exist",
            });
        }
        const userProfile = {
            email: email,
            role: 'user'
        };
        const accessToken = jwt.sign({ userProfile }, process.env.ACCESS_TOKEN);
        const refreshToken = jwt.sign({ userProfile }, process.env.REFRESH_TOKEN);
        res.cookie('accessToken', accessToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Login successful",
            status: 200,
            accessToken: accessToken
        });
    }
    catch (err) {
        console.log(err);
    }
});
const signup = (req, res) => {
};
const logout = (req, res) => {
};
const verifySignup = (req, res) => {
};
const accessToken = (req, res) => {
};
module.exports = {
    signin,
    signup,
    logout,
    verifySignup,
    accessToken
};
