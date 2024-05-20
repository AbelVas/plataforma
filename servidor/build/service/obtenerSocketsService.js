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
exports.obtenerSocketStudent = exports.obtenerSocketDocente = void 0;
const database_1 = __importDefault(require("../config/database"));
const obtenerSocketDocente = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const getSocketsDocentes = yield database_1.default.query("SELECT socket FROM tbSocketsProfesores WHERE idProfesor=?", [idUsuario]);
    return getSocketsDocentes;
});
exports.obtenerSocketDocente = obtenerSocketDocente;
const obtenerSocketStudent = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const getSocketsDocentes = yield database_1.default.query("SELECT socket FROM tbSocketsAlumnos WHERE idAlumno=?", [idUsuario]);
    return getSocketsDocentes;
});
exports.obtenerSocketStudent = obtenerSocketStudent;
