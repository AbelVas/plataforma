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
exports.obtenerAlumnosPorCodigoService = exports.getTutorporAlumno = exports.getEstadoTutor = exports.getEstadoProfesor = exports.getEstadoAlumno = exports.UpdateStatusTutores = exports.UpdateStatusProfesor = exports.UpdateStatusAlumnos = exports.verifyPassword = exports.validarAlumnosExisteSi = exports.deleteAlumnoService = exports.updateAlumnosService = exports.obtenerAlumnoService = exports.obtenerAlumnosGradoService = exports.obtenerAlumnosService = exports.insertAlumnosService = exports.verNotasAlumnosService = exports.getNotasVerService = exports.fotoPerfilAlumnoService = exports.getFotoPerfilAlumnoService = void 0;
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
//este me sirve para validar la comunicación entre papás e hijos
const obtenerAlumnosPorCodigoService = (idCodigo, idTutor) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT al.idAlumno, al.nombres_alumno, al.apellidos_alumno, al.sexo, al.usuario, g.nombre_grado, s.seccion, co.codigo, COUNT(reta.idAlumno) AS veces_vinculado, CASE WHEN rat.idAlumno IS NOT NULL THEN 1 ELSE 0 END AS ya_vinculado FROM tbAlumno al INNER JOIN tbGrado g ON g.idGrado = al.idGrado INNER JOIN tbSeccion s ON s.idSeccion = g.idSeccion INNER JOIN tbCodigo co ON co.idCodigo = al.idCodigo LEFT JOIN tbReacionAlumnoTutor reta ON reta.idAlumno = al.idAlumno LEFT JOIN tbReacionAlumnoTutor rat ON rat.idAlumno = al.idAlumno AND rat.idTutor = ? WHERE al.idRol = 4 AND co.codigo = ? GROUP BY al.idAlumno, al.nombres_alumno, al.apellidos_alumno, al.sexo, al.usuario, g.nombre_grado, s.seccion, co.codigo;', [idTutor, idCodigo]);
    return responseGet;
});
exports.obtenerAlumnosPorCodigoService = obtenerAlumnosPorCodigoService;
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
    const responseGet = yield database_1.default.query('SELECT a.idAlumno, a.nombres_alumno, a.apellidos_alumno, a.ver_notas, a.activo, a.sexo, a.usuario, g.idGrado, g.nombre_grado, a.idCodigo, g.nombre_grado, s.idSeccion, s.seccion, c.codigo FROM tbAlumno a INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbCodigo c ON a.idCodigo=c.idCodigo WHERE idAlumno=?', [id]);
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
const verNotasAlumnosService = (estado) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield database_1.default.query('UPDATE tbAlumno SET ver_notas=?', [estado]);
    return update;
});
exports.verNotasAlumnosService = verNotasAlumnosService;
const getNotasVerService = () => __awaiter(void 0, void 0, void 0, function* () {
    const selectVer = yield database_1.default.query('SELECT count(idAlumno) FROM `tbAlumno` WHERE ver_notas=1');
    const selectNoVer = yield database_1.default.query('SELECT count(idAlumno) FROM `tbAlumno` WHERE ver_notas=0');
    const ver = Object.values(selectVer[0]);
    const nover = Object.values(selectNoVer[0]);
    var objtVer = {
        noVer: nover[0],
        ver: ver[0]
    };
    return objtVer;
});
exports.getNotasVerService = getNotasVerService;
const getEstadoAlumno = () => __awaiter(void 0, void 0, void 0, function* () {
    const ActivoEstudiante = yield database_1.default.query('SELECT count(idAlumno) FROM `tbAlumno` WHERE activo=1');
    const NoActivoEstudiante = yield database_1.default.query('SELECT count(idAlumno) FROM `tbAlumno` WHERE activo=0');
    const Activo = Object.values(ActivoEstudiante[0]);
    const Inactivo = Object.values(NoActivoEstudiante[0]);
    var objtEstudiantesActivo = {
        noActivo: Inactivo[0],
        siActivo: Activo[0]
    };
    return objtEstudiantesActivo;
});
exports.getEstadoAlumno = getEstadoAlumno;
const getEstadoProfesor = () => __awaiter(void 0, void 0, void 0, function* () {
    const ActivoProfesor = yield database_1.default.query('SELECT count(idProfesor) FROM `tbProfesor` WHERE estatus=1');
    const NoActivoProfesor = yield database_1.default.query('SELECT count(idProfesor) FROM `tbProfesor` WHERE estatus=0');
    const Activo = Object.values(ActivoProfesor[0]);
    const Inactivo = Object.values(NoActivoProfesor[0]);
    var objtProfesorActivo = {
        noActivo: Inactivo[0],
        siActivo: Activo[0]
    };
    return objtProfesorActivo;
});
exports.getEstadoProfesor = getEstadoProfesor;
const getEstadoTutor = () => __awaiter(void 0, void 0, void 0, function* () {
    const ActivoTutor = yield database_1.default.query('SELECT count(idTutor) FROM `tbTutor` WHERE estado=1');
    const NoActivoTutor = yield database_1.default.query('SELECT count(idTutor) FROM `tbTutor` WHERE estado=0');
    const Activo = Object.values(ActivoTutor[0]);
    const Inactivo = Object.values(NoActivoTutor[0]);
    var objTutorActivo = {
        noActivo: Inactivo[0],
        siActivo: Activo[0]
    };
    return objTutorActivo;
});
exports.getEstadoTutor = getEstadoTutor;
const UpdateStatusAlumnos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield database_1.default.query('Update tbAlumno set activo=? where idRol=4', [id]);
    return update;
});
exports.UpdateStatusAlumnos = UpdateStatusAlumnos;
const UpdateStatusProfesor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield database_1.default.query('Update tbProfesor set estatus=? where idRol=2', [id]);
    return update;
});
exports.UpdateStatusProfesor = UpdateStatusProfesor;
const UpdateStatusTutores = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield database_1.default.query('Update tbTutor set estado=? where idRol=3', [id]);
    return update;
});
exports.UpdateStatusTutores = UpdateStatusTutores;
const fotoPerfilAlumnoService = (id, ruta, peso, subida) => __awaiter(void 0, void 0, void 0, function* () {
    const consultaprev = yield database_1.default.query("UPDATE tbImagenPerfilAlumno SET activa=0 WHERE idAlumno=?", [id]);
    const consulta = yield database_1.default.query('INSERT INTO tbImagenPerfilAlumno SET idAlumno=?, ruta_imagen=?, peso_archivo=?, activa=1, subida=?', [id, ruta, peso, subida]);
    return consulta;
});
exports.fotoPerfilAlumnoService = fotoPerfilAlumnoService;
const getFotoPerfilAlumnoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getFoto = yield database_1.default.query("SELECT CASE WHEN img.activa = 1 THEN img.ruta_imagen WHEN img.activa IS NULL THEN NULL ELSE 'null' END AS ruta_imagen, CONCAT(a.nombres_alumno, ' ', a.apellidos_alumno) AS alumno FROM tbImagenPerfilAlumno img RIGHT JOIN tbAlumno a ON a.idAlumno = img.idAlumno WHERE a.idAlumno = ? AND (img.activa = 1 OR img.activa IS NULL);", [id]);
    return getFoto;
});
exports.getFotoPerfilAlumnoService = getFotoPerfilAlumnoService;
const getTutorporAlumno = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getId = yield database_1.default.query("SELECT idTutor FROM tbReacionAlumnoTutor WHERE idAlumno=? LIMIT 1", [id]);
    return getId;
});
exports.getTutorporAlumno = getTutorporAlumno;
