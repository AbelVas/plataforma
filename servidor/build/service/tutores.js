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
exports.obtenerTutorNotasService = exports.getAlumnoporTutorService = exports.verifyPassword = exports.getTutorconAlumnoService = exports.validarTutoresExisteSi = exports.deleteTutoresService = exports.updateTutorService = exports.obtenerTutorService = exports.obtenerTutoresService = exports.insertTutoresService = exports.tutoresAlumnoService = exports.insertTutorAlumnoService = exports.deleteTutorAlumnoService = void 0;
const database_1 = __importDefault(require("../config/database"));
const passwordFunction_1 = require("../utils/passwordFunction");
//CRUD
const deleteTutorAlumnoService = (idTutor, idAlumno) => __awaiter(void 0, void 0, void 0, function* () {
    const eliminarData = yield database_1.default.query('DELETE FROM tbReacionAlumnoTutor WHERE idTutor=? and idAlumno=?', [idTutor, idAlumno]);
    return eliminarData;
});
exports.deleteTutorAlumnoService = deleteTutorAlumnoService;
const insertTutorAlumnoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const insertData = yield database_1.default.query('INSERT INTO tbReacionAlumnoTutor set ?', [data]);
    return insertData;
});
exports.insertTutorAlumnoService = insertTutorAlumnoService;
const tutoresAlumnoService = (idTutor) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT al.idAlumno,CONCAT(al.apellidos_alumno," ",al.nombres_alumno) as alumno,CONCAT(g.nombre_grado,", Sección: ",s.seccion) as grado,tu.idTutor,co.codigo FROM tbReacionAlumnoTutor reta INNER JOIN tbAlumno al ON al.idAlumno=reta.idAlumno INNER JOIN tbTutor tu ON tu.idTutor=reta.idTutor INNER JOIN tbGrado g ON g.idGrado=al.idGrado INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion INNER JOIN tbCodigo co ON co.idCodigo=al.idCodigo WHERE tu.idTutor=?', [idTutor]);
    return responseGet;
});
exports.tutoresAlumnoService = tutoresAlumnoService;
//asignación de tutores
const insertTutoresService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbTutor set ?', [data]);
    return responseInsert;
});
exports.insertTutoresService = insertTutoresService;
const obtenerTutoresService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT  idTutor,nombre_tutor,apellido_tutor,telefono1,telefono2,telefono_casa,direccion,direccion_trabajo,usuario,pass,correo1,correo2,nombre_opcional,dpi,estado FROM tbTutor');
    return responseGet;
});
exports.obtenerTutoresService = obtenerTutoresService;
const obtenerTutorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT  idTutor,nombre_tutor,apellido_tutor,telefono1,telefono2,telefono_casa,direccion,direccion_trabajo,usuario,pass,correo1,correo2,nombre_opcional,dpi,estado FROM tbTutor WHERE idTutor=?', [id]);
    return responseGet;
});
exports.obtenerTutorService = obtenerTutorService;
const obtenerTutorNotasService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT ver_notas FROM tbTutor WHERE idTutor=?', [id]);
    return responseGet;
});
exports.obtenerTutorNotasService = obtenerTutorNotasService;
const updateTutorService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbTutor SET ? WHERE idTutor=?', [data, id]);
    return responseUpdate;
});
exports.updateTutorService = updateTutorService;
const deleteTutoresService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbTutor WHERE idTutor=?', [id]);
    return responseDelete;
});
exports.deleteTutoresService = deleteTutoresService;
const validarTutoresExisteSi = (usuario, telefono1) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query('SELECT idTutor FROM tbTutor WHERE usuario=? and telefono1=?', [usuario, telefono1]);
    return data;
});
exports.validarTutoresExisteSi = validarTutoresExisteSi;
const verifyPassword = (id, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const compararPass = yield database_1.default.query('SELECT idTutor,pass FROM tbTutor WHERE idTutor=?', [id]);
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
const getTutorconAlumnoService = (idAlum) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGetTutorconAlumno = yield database_1.default.query('SELECT `idTutor`, `nombre_tutor`, `apellido_tutor`, `telefono1`, `telefono2`, `direccion`, `usuario`,  `estado` FROM tbTutor WHERE idAlumno=? ', [idAlum]);
    return responseGetTutorconAlumno;
});
exports.getTutorconAlumnoService = getTutorconAlumnoService;
const getAlumnoporTutorService = (idTutor) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGetAlumnoporTutor = yield database_1.default.query('SELECT a.idAlumno, a.nombres_alumno, a.apellidos_alumno, a.sexo, a.usuario, g.idGrado, g.nombre_grado, s.idSeccion, s.seccion, c.codigo FROM tbAlumno a INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbCodigo c ON a.idCodigo=c.idCodigo WHERE idTutor=?', [idTutor]);
    return responseGetAlumnoporTutor;
});
exports.getAlumnoporTutorService = getAlumnoporTutorService;
