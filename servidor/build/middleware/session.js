"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt_generador_1 = require("../utils/jwt.generador");
const checkJwt = (req, res, next) => {
    try {
        const jwtByUser = req.header('Auth-Token');
        if (jwtByUser == "") {
            console.log("NUlO");
        }
        else {
            const isOk = (0, jwt_generador_1.verifyToken)(jwtByUser);
            if (isOk) {
                next();
            }
        }
    }
    catch (e) {
        res.status(400);
        res.send("Tu token y/o Sesión no es Valida");
    }
};
exports.checkJwt = checkJwt;
