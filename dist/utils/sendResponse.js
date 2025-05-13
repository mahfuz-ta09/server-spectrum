"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    const responsePayload = {
        meta: {
            page: data.page,
            limit: data.limit,
            total: data.total,
            accessToken: data.accessToken,
        },
        success: data.success,
        message: data.message,
        data: data.data,
        status: data.status
    };
    res.status(data.status).json(responsePayload);
};
exports.sendResponse = sendResponse;
