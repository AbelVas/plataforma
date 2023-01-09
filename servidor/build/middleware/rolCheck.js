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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRol = void 0;
const jwt_generador_1 = require("../utils/jwt.generador");
const database_1 = __importDefault(require("../config/database"));
const checkRol = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var errorRolValidacion = 0;
        const token = req.header('Auth-Token');
        const tokenData = (0, jwt_generador_1.verifyToken)(token);
        const resBD = yield database_1.default.query("SELECT idProfesor,idRol FROM tbProfesor WHERE idRol=? and idProfesor=?", [tokenData.idRol, tokenData.idUsuario]);
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] == resBD[0].idRol) {
                next();
                break;
                //
            }
            else {
                errorRolValidacion = errorRolValidacion + 1;
            }
        }
        if (errorRolValidacion != 0) {
            res.send("Error, no tienes permisos");
        }
    }
    catch (error) {
        console.log(error);
        //res.send("no se detecta nada")
    }
});
exports.checkRol = checkRol;
