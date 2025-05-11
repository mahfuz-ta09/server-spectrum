import { authModules } from "../modules/authModules"

const express = require('express')
const router = express.Router()


const appRouter = [
    {
        path:'/auth',
        route: authModules
    }
]

appRouter.forEach(route => router.use(route.path,route.route))
module.exports = router