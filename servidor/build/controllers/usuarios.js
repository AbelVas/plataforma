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
exports.updateEstadoTutor = exports.updateEstadoProfesor = exports.updateEstadoAlumno = exports.ObtEstadoTutor = exports.ObtEstadoProfesor = exports.ObtEstadoAlumno = exports.getNotasVer = exports.verNotasAlumnos = exports.compararPass = exports.insertarAlumno = exports.deleteAlumno = exports.updateAlumno = exports.getAlumnosGrado = exports.getAlumno = exports.getAlumnos = exports.fotoPerfilAlumnoController = exports.getFotoPerfilActivaAlumno = void 0;
const usuarios_1 = require("../service/usuarios");
const error_handle_1 = require("../utils/error.handle");
const passwordFunction_1 = require("../utils/passwordFunction");
const app_1 = require("../app"); // Importa el objeto de Socket.io
const getAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoAlumno = yield (0, usuarios_1.obtenerAlumnosService)();
        res.send(resultadoAlumno);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAlumnos = getAlumnos;
const getAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoAlumno = yield (0, usuarios_1.obtenerAlumnoService)(id);
        res.send(resultadoAlumno);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAlumno = getAlumno;
const getAlumnosGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoAlumnosGrado = yield (0, usuarios_1.obtenerAlumnosGradoService)(id);
        res.send(resultadoAlumnosGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAlumnosGrado = getAlumnosGrado;
const updateAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { pass } = req.body;
        if (pass == null) {
            const resultado = yield (0, usuarios_1.updateAlumnosService)(req.body, id);
            res.send(resultado);
        }
        else {
            const passEncrypt = yield (0, passwordFunction_1.encrypt)(req.body.pass);
            req.body.pass = passEncrypt;
            const resultadoAlumno = yield (0, usuarios_1.updateAlumnosService)(req.body, id);
            res.send(resultadoAlumno);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateAlumno = updateAlumno;
const deleteAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoAlumno = yield (0, usuarios_1.deleteAlumnoService)(id);
        res.send(resultadoAlumno);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteAlumno = deleteAlumno;
const insertarAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validar = yield (0, usuarios_1.validarAlumnosExisteSi)(req.body.usuario);
        if (validar != '') {
            res.send("Error, Alumno ya existe");
        }
        else {
            const passEncrypt = yield (0, passwordFunction_1.encrypt)(req.body.pass);
            req.body.pass = passEncrypt;
            const resultadoAlumno = yield (0, usuarios_1.insertAlumnosService)(req.body);
            res.send(resultadoAlumno);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertarAlumno = insertarAlumno;
const compararPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { pass } = req.body;
        const resultadoDelete = yield (0, usuarios_1.verifyPassword)(id, pass);
        res.send(resultadoDelete);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.compararPass = compararPass;
const verNotasAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const accion = yield (0, usuarios_1.verNotasAlumnosService)(id);
        res.send(accion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.verNotasAlumnos = verNotasAlumnos;
const getNotasVer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accion = yield (0, usuarios_1.getNotasVerService)();
        res.send(accion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getNotasVer = getNotasVer;
const ObtEstadoAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accion = yield (0, usuarios_1.getEstadoAlumno)();
        res.send(accion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.ObtEstadoAlumno = ObtEstadoAlumno;
const ObtEstadoProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accion = yield (0, usuarios_1.getEstadoProfesor)();
        res.send(accion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.ObtEstadoProfesor = ObtEstadoProfesor;
const ObtEstadoTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accion = yield (0, usuarios_1.getEstadoTutor)();
        res.send(accion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.ObtEstadoTutor = ObtEstadoTutor;
const updateEstadoAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const accion = yield (0, usuarios_1.UpdateStatusAlumnos)(id);
        res.send(accion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateEstadoAlumno = updateEstadoAlumno;
const updateEstadoProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const accion = yield (0, usuarios_1.UpdateStatusProfesor)(id);
        res.send(accion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateEstadoProfesor = updateEstadoProfesor;
const updateEstadoTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const accion = yield (0, usuarios_1.UpdateStatusTutores)(id);
        res.send(accion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateEstadoTutor = updateEstadoTutor;
const fotoPerfilAlumnoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { ruta_imagen } = req.body;
        const { idAlumno } = req.body;
        const { peso_archivo } = req.body;
        const { subida } = req.body;
        const { idRol } = req.body;
        const fotoPerfilAlumno = yield (0, usuarios_1.fotoPerfilAlumnoService)(idAlumno, ruta_imagen, peso_archivo, subida);
        app_1.io.emit('actualizar-foto-ferfil-alumno', { usuario: idAlumno, idRol: idRol });
        res.send(fotoPerfilAlumno);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.fotoPerfilAlumnoController = fotoPerfilAlumnoController;
const getFotoPerfilActivaAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const consulta = yield (0, usuarios_1.getFotoPerfilAlumnoService)(id);
        res.send(consulta);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getFotoPerfilActivaAlumno = getFotoPerfilActivaAlumno;
