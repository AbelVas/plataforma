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
exports.verifyPassword = exports.eliminarAdminService = exports.validarAdminExisteSi = exports.updateAdminService = exports.getAdminsService = exports.getAdminService = exports.insertarAdminService = exports.fotoPerfilAdminService = exports.getFotoPerfilAdminService = void 0;
const database_1 = __importDefault(require("../config/database"));
const passwordFunction_1 = require("../utils/passwordFunction");
const insertarAdminService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const insert = yield database_1.default.query('INSERT INTO tbProfesor set ?', [req]);
    return insert;
});
exports.insertarAdminService = insertarAdminService;
const getAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query("SELECT p.idProfesor,c.codigo,p.nombre_profesor,p.apellido_profesor,p.telefono,p.CUI,p.usuario,p.fecha_nacimiento,p.estatus,p.creado,p.permitir_ver_correo,p.idRol FROM tbProfesor p INNER JOIN tbCodigo c ON p.idCodigo=c.idCodigo WHERE p.idProfesor=? and p.idRol=1", [id]);
    return data;
});
exports.getAdminService = getAdminService;
const getAdminsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query("SELECT idProfesor, idCodigo, nombre_profesor, apellido_profesor, telefono, CUI, usuario, fecha_nacimiento, estatus, creado, permitir_ver_correo, idRol FROM `tbProfesor` WHERE idProfesor!=1 and idRol=1");
    return data;
});
exports.getAdminsService = getAdminsService;
const updateAdminService = (admin, id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query("UPDATE tbProfesor SET ? WHERE idProfesor=?", [admin, id]);
    return data;
});
exports.updateAdminService = updateAdminService;
const validarAdminExisteSi = (usuario, CUI) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query('SELECT idProfesor FROM tbProfesor WHERE usuario=? and CUI=?', [usuario, CUI]);
    return data;
});
exports.validarAdminExisteSi = validarAdminExisteSi;
const eliminarAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id == "1")
        return "NO SE PUEDE ELIMINAR AL ADMINISTRADOR PRINCIPAL";
    const eliminar = yield database_1.default.query('DELETE FROM tbProfesor WHERE idProfesor=?', [id]);
    return eliminar;
});
exports.eliminarAdminService = eliminarAdminService;
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
const fotoPerfilAdminService = (id, ruta, peso, subida) => __awaiter(void 0, void 0, void 0, function* () {
    const consultaprev = yield database_1.default.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?", [id]);
    const consulta = yield database_1.default.query('INSERT INTO tbImagenPerfilProfesor SET idProfesor=?, ruta_imagen=?, peso_archivo=?, activa=1, subida=?', [id, ruta, peso, subida]);
    return consulta;
});
exports.fotoPerfilAdminService = fotoPerfilAdminService;
const getFotoPerfilAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getFoto = yield database_1.default.query("SELECT CASE WHEN img.activa = 1 THEN img.ruta_imagen WHEN img.activa IS NULL THEN NULL ELSE 'null' END AS ruta_imagen, CONCAT(p.nombre_profesor, ' ', p.apellido_profesor) AS profesor FROM tbImagenPerfilProfesor img RIGHT JOIN tbProfesor p ON p.idProfesor = img.idProfesor WHERE p.idProfesor = ? AND (img.activa = 1 OR img.activa IS NULL);", [id]);
    return getFoto;
});
exports.getFotoPerfilAdminService = getFotoPerfilAdminService;
