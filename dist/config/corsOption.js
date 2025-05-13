"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const urlList = ['http://localhost:3000', 'http://localhost:3001', 'https://spectrum-ruby.vercel.app'];
exports.corsOptions = {
    origin: function (origin, callback) {
        if (urlList.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: ["Content-Type", "Authorization", "authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true
};
