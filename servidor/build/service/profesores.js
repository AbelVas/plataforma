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
exports.getFotoCursoProfesorService = exports.fotoCursoProfesorService = exports.getGradoGuiaProfesorService = exports.verifyPassword = exports.validarAdminExisteSi = exports.insertProfesorService = exports.deleteProfesorService = exports.updateProfesorService = exports.obtenerProfesorService = exports.obtenerProfesoresService = exports.getFotoPerfilProfesorService = exports.fotoPerfilProfesorService = void 0;
const database_1 = __importDefault(require("../config/database"));
const passwordFunction_1 = require("../utils/passwordFunction");
const obtenerProfesoresService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idProfesor`, `idCodigo`, `nombre_profesor`, `apellido_profesor`, `telefono`, `CUI`, `usuario`, `fecha_nacimiento`, `estatus`, `creado`, `permitir_ver_correo`, `idRol` FROM `tbProfesor` WHERE idRol=2 order by apellido_profesor asc');
    return responseGet;
});
exports.obtenerProfesoresService = obtenerProfesoresService;
const obtenerProfesorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT p.idProfesor,c.codigo,p.nombre_profesor,p.apellido_profesor,p.telefono,p.CUI,p.usuario,p.fecha_nacimiento,p.estatus,p.creado,p.permitir_ver_correo,p.idRol,p.correo1,p.correo2 FROM tbProfesor p INNER JOIN tbCodigo c ON p.idCodigo=c.idCodigo WHERE p.idRol=2 and p.idProfesor=?', [id]);
    return responseGet;
});
exports.obtenerProfesorService = obtenerProfesorService;
const updateProfesorService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbProfesor SET ? WHERE idRol=2 and idProfesor=?', [data, id]);
    return responseUpdate;
});
exports.updateProfesorService = updateProfesorService;
const deleteProfesorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield database_1.default.query('SELECT idProfesor,idCodigo FROM tbProfesor WHERE idProfesor=? and idRol=2', [id]);
    const dataUsuario = Object.values(existe[0]);
    const activarCodigo = yield database_1.default.query('UPDATE tbCodigo SET activo=1 WHERE idCodigo=?', [dataUsuario[1]]);
    const responseDelete = yield database_1.default.query('DELETE FROM tbProfesor WHERE idRol=2 and idProfesor=?', [id]);
    return responseDelete;
});
exports.deleteProfesorService = deleteProfesorService;
const insertProfesorService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield database_1.default.query('SELECT idProfesor FROM tbProfesor WHERE CUI=? OR usuario=?', [data.CUI, data.usuario]);
    if (existe == '') {
        const responseInsert = yield database_1.default.query('INSERT INTO tbProfesor set ?', [data]);
        const usarCodigo = yield database_1.default.query('UPDATE tbCodigo SET activo="0" WHERE idCodigo=?', [data.idCodigo]);
        return responseInsert;
    }
    else {
        return false;
    }
});
exports.insertProfesorService = insertProfesorService;
const validarAdminExisteSi = (usuario, CUI, telefono) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query('SELECT idProfesor FROM tbProfesor WHERE usuario=? and CUI=? and telefono=?', [usuario, CUI, telefono]);
    return data;
});
exports.validarAdminExisteSi = validarAdminExisteSi;
const verifyPassword = (id, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const compararPass = yield database_1.default.query('SELECT idProfesor,pass FROM tbProfesor WHERE idProfesor=?', [id]);
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
const getGradoGuiaProfesorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query('SELECT gg.idGuias, gg.idGrado, g.nombre_grado, n.nivel, j.jornada, s.seccion FROM tbGuiaGrado gg INNER JOIN tbGrado g ON gg.idGrado=g.idGrado INNER JOIN tbNivel n ON g.idNivel=n.idNivel INNER JOIN tbJornada j ON n.idJornada=j.idJornada INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion WHERE idProfesor=?', [id]);
    return data;
});
exports.getGradoGuiaProfesorService = getGradoGuiaProfesorService;
const getFotoPerfilProfesorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getFoto = yield database_1.default.query("SELECT CASE WHEN img.activa = 1 THEN img.ruta_imagen WHEN img.activa IS NULL THEN NULL ELSE 'null' END AS ruta_imagen, CONCAT(p.nombre_profesor, ' ', p.apellido_profesor) AS profesor FROM tbImagenPerfilProfesor img RIGHT JOIN tbProfesor p ON p.idProfesor = img.idProfesor WHERE p.idProfesor = ? AND (img.activa = 1 OR img.activa IS NULL);", [id]);
    return getFoto;
});
exports.getFotoPerfilProfesorService = getFotoPerfilProfesorService;
const fotoPerfilProfesorService = (id, ruta, peso, subida) => __awaiter(void 0, void 0, void 0, function* () {
    const consultaprev = yield database_1.default.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?", [id]);
    const consulta = yield database_1.default.query('INSERT INTO tbImagenPerfilProfesor SET idProfesor=?, ruta_imagen=?, peso_archivo=?, activa=1, subida=?', [id, ruta, peso, subida]);
    return consulta;
});
exports.fotoPerfilProfesorService = fotoPerfilProfesorService;
const fotoCursoProfesorService = (id, ruta, peso, subida) => __awaiter(void 0, void 0, void 0, function* () {
    const consultaprev = yield database_1.default.query("UPDATE tbImagenCurso SET activa=0 WHERE idCurso=?", [id]);
    const consulta = yield database_1.default.query('INSERT INTO tbImagenCurso SET idCurso=?, ruta_imagen=?, peso_archivo=?, activa=1, subida=?', [id, ruta, peso, subida]);
    return consulta;
});
exports.fotoCursoProfesorService = fotoCursoProfesorService;
const getFotoCursoProfesorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getFoto = yield database_1.default.query("SELECT CASE WHEN img.activa = 1 THEN img.ruta_imagen WHEN img.activa IS NULL THEN NULL ELSE 'null' END AS ruta_imagen FROM tbImagenCurso img RIGHT JOIN tbCurso p ON p.idCurso = img.idCurso WHERE p.idCurso = ? AND (img.activa = 1 OR img.activa IS NULL);", [id]);
    return getFoto;
});
exports.getFotoCursoProfesorService = getFotoCursoProfesorService;
