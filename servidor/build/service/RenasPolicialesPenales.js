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
exports.obtenerAntecedentesPoliciacosService = exports.obtenerAntecedentesPenalesService = exports.obtenerRenasService = exports.insertarRenasService = exports.insertarAPoliciacosService = exports.insertarAPenalesService = exports.eliminarArchivo = void 0;
const database_1 = __importDefault(require("../config/database"));
const obtenerRenasService = (idProfesor, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query("SELECT ruta_archivo FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?", [idProfesor, nombre]);
    return consulta;
});
exports.obtenerRenasService = obtenerRenasService;
const obtenerAntecedentesPenalesService = (idProfesor, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query("SELECT ruta_archivo FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?", [idProfesor, nombre]);
    return consulta;
});
exports.obtenerAntecedentesPenalesService = obtenerAntecedentesPenalesService;
const obtenerAntecedentesPoliciacosService = (idProfesor, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query("SELECT ruta_archivo FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?", [idProfesor, nombre]);
    return consulta;
});
exports.obtenerAntecedentesPoliciacosService = obtenerAntecedentesPoliciacosService;
const insertarRenasService = (idProfesor, nombre, peso_archivo, ruta_archivo) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query("INSERT INTO tbRenasPenalesPoliciales(idProfesor,nombre,peso_archivo,ruta_archivo) values(?,?,?,?)", [idProfesor, nombre, peso_archivo, ruta_archivo]);
    return consulta;
});
exports.insertarRenasService = insertarRenasService;
const insertarAPoliciacosService = (idProfesor, nombre, peso_archivo, ruta_archivo) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query("INSERT INTO tbRenasPenalesPoliciales(idProfesor,nombre,peso_archivo,ruta_archivo) values(?,?,?,?)", [idProfesor, nombre, peso_archivo, ruta_archivo]);
    return consulta;
});
exports.insertarAPoliciacosService = insertarAPoliciacosService;
const insertarAPenalesService = (idProfesor, nombre, peso_archivo, ruta_archivo) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query("INSERT INTO tbRenasPenalesPoliciales(idProfesor,nombre,peso_archivo,ruta_archivo) values(?,?,?,?)", [idProfesor, nombre, peso_archivo, ruta_archivo]);
    return consulta;
});
exports.insertarAPenalesService = insertarAPenalesService;
const eliminarArchivo = (idProfesor, tipoArchivo) => __awaiter(void 0, void 0, void 0, function* () {
    if (tipoArchivo == 'penales') {
        const query = yield database_1.default.query("DELETE FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?", [idProfesor, tipoArchivo]);
        return query;
    }
    else if (tipoArchivo == 'policiacos') {
        const query = yield database_1.default.query("DELETE FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?", [idProfesor, tipoArchivo]);
        return query;
    }
    else if (tipoArchivo == 'renas') {
        const query = yield database_1.default.query("DELETE FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?", [idProfesor, tipoArchivo]);
        return query;
    }
});
exports.eliminarArchivo = eliminarArchivo;
