"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackRequest = void 0;
const fs = require('fs');
const path = require('path');
const trackRequest = () => {
    return (req, res, next) => {
        const filePath = path.join(__dirname, '../text_folder', 'reqLog.txt');
        if (!fs.existsSync()) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log(`${req.method} ${req.originalUrl}`);
        const loggedMessage = `${new Date().toISOString()} \t\t ${req.method} \t\t ${req.originalUrl} \t ${ip}`;
        fs.appendFile(filePath, loggedMessage + '\n', (err) => {
            if (err) {
                console.error('Error writing to the log file:', err);
            }
            else {
                console.log('Log logged');
            }
        });
        next();
    };
};
exports.trackRequest = trackRequest;
