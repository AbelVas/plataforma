"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = "fc368f3e3407a7606f3d8d85db76a2f439ead8d0ab7f0c7becc5ad45bf601e16";
const generateToken = (idUsuario, idRol, nombre_profesor, apellido_profesor, rol) => {
    const jwt = (0, jsonwebtoken_1.sign)({ idUsuario, idRol, nombre_profesor, apellido_profesor, rol }, JWT_SECRET, { expiresIn: "24h" });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (jwt) => {
    const isOk = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return isOk;
};
exports.verifyToken = verifyToken;
