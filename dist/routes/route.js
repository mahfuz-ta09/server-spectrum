"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authModules_1 = require("../modules/authModules");
const express = require('express');
const router = express.Router();
const appRouter = [
    {
        path: '/auth',
        route: authModules_1.authModules
    }
];
appRouter.forEach(route => router.use(route.path, route.route));
module.exports = router;
