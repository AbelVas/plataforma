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
exports.loginController = void 0;
const express_1 = require("express");
const auth_1 = require("../service/auth");
const error_handle_1 = require("../utils/error.handle");
const loginController = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, pass } = body;
        const responseUser = yield (0, auth_1.loginUser)(usuario, pass);
        if (responseUser === 'Usuario o Contraseña Incorrecta') {
            //res.status(403);
            res.send(responseUser);
        }
        else {
            res.send(responseUser);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, express_1.request, res);
    }
});
exports.loginController = loginController;
