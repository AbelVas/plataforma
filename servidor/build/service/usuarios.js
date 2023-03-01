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
exports.verifyPassword = exports.validarAlumnosExisteSi = exports.deleteAlumnoService = exports.updateAlumnosService = exports.obtenerAlumnoService = exports.obtenerAlumnosGradoService = exports.obtenerAlumnosService = exports.insertAlumnosService = void 0;
const database_1 = __importDefault(require("../config/database"));
const passwordFunction_1 = require("../utils/passwordFunction");
//CRUD
const insertAlumnosService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield database_1.default.query('SELECT idAlumno FROM tbAlumno WHERE usuario=?', [data.usuario]);
    if (existe == '') {
        const responseInsert = yield database_1.default.query('INSERT INTO tbAlumno set ?', [data]);
        const usarCodigo = yield database_1.default.query('UPDATE tbCodigo SET activo="0" WHERE idCodigo=?', [data.idCodigo]);
        return responseInsert;
    }
    else {
        return false;
    }
});
exports.insertAlumnosService = insertAlumnosService;
const obtenerAlumnosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT al.idAlumno,al.nombres_alumno,al.apellidos_alumno,al.sexo,al.usuario,al.activo,g.nombre_grado,s.seccion FROM (tbAlumno al INNER JOIN tbGrado g on g.idGrado=al.idGrado)INNER JOIN tbSeccion s on s.idSeccion=g.idSeccion WHERE idRol=4');
    return responseGet;
});
exports.obtenerAlumnosService = obtenerAlumnosService;
const obtenerAlumnosGradoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT idAlumno,idCodigo,sexo,apellidos_alumno,nombres_alumno,CONCAT(apellidos_alumno,", ",nombres_alumno) AS alumno,usuario,activo FROM tbAlumno WHERE idRol=4 and idGrado=?', [id]);
    return responseGet;
});
exports.obtenerAlumnosGradoService = obtenerAlumnosGradoService;
const obtenerAlumnoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT a.idAlumno, a.nombres_alumno, a.apellidos_alumno, a.activo, a.sexo, a.usuario, g.idGrado, a.idCodigo, g.nombre_grado, s.idSeccion, s.seccion, c.codigo FROM tbAlumno a INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbCodigo c ON a.idCodigo=c.idCodigo WHERE idAlumno=?', [id]);
    return responseGet;
});
exports.obtenerAlumnoService = obtenerAlumnoService;
const updateAlumnosService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbAlumno SET ? WHERE idRol=4 and idAlumno=?', [data, id]);
    return responseUpdate;
});
exports.updateAlumnosService = updateAlumnosService;
const deleteAlumnoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteNota = yield database_1.default.query('DELETE FROM tbCalificacion WHERE idAlumno=? ', [id]);
    const abandonoFamiliar = yield database_1.default.query('DELETE FROM tbReacionAlumnoTutor WHERE idAlumno=? ', [id]);
    const responseDelete = yield database_1.default.query('DELETE FROM tbAlumno WHERE idRol=4 and idAlumno=?', [id]);
    return responseDelete;
});
exports.deleteAlumnoService = deleteAlumnoService;
const validarAlumnosExisteSi = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query('SELECT idAlumno FROM tbAlumno WHERE usuario=?', [usuario]);
    return data;
});
exports.validarAlumnosExisteSi = validarAlumnosExisteSi;
const verifyPassword = (id, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const compararPass = yield database_1.default.query('SELECT idAlumno,pass FROM tbAlumno WHERE idAlumno=?', [id]);
    if (compararPass == '')
        return "Error, Contraseña Incorrecta";
    const dataUsuario = Object.values(compararPass[0]);
    const passwordHash = dataUsuario[1];
    const isCorrect = yield (0, passwordFunction_1.verified)(pass, passwordHash);
    if (!isCorrect)
        return "Error, las contraseñas no coinciden ";
    return '1';
});
exports.verifyPassword = verifyPassword;
