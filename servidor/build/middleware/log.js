"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddleware = void 0;
const logMiddleware = (req, res, next) => {
    const header = req.headers;
    //const userAgent=header["user-agent"];
    next();
};
exports.logMiddleware = logMiddleware;
