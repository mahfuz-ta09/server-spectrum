const express = require('express')
const router = express.Router()
const { signin , signup , logout , verifySignup , accessToken } = require('../controllers/profileNauth/authControllers')


router.post('/signin',signin)
router.post('/signup',signup)
router.post('/logout',logout)
router.post('/verify-signup',verifySignup)
router.post('/access-token',accessToken)

export const authModules = router