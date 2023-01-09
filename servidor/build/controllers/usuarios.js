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
exports.compararPass = exports.insertarAlumno = exports.deleteAlumno = exports.updateAlumno = exports.getAlumnosGrado = exports.getAlumno = exports.getAlumnos = void 0;
const usuarios_1 = require("../service/usuarios");
const error_handle_1 = require("../utils/error.handle");
const passwordFunction_1 = require("../utils/passwordFunction");
const getAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoAlumno = yield (0, usuarios_1.obtenerAlumnosService)();
        res.send(resultadoAlumno);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener a los Alumnos');
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
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener al Alumno');
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
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener a los alumnos del grado');
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
        (0, error_handle_1.handleHttp)(res, 'Error al Actualizar al Alumno');
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
        (0, error_handle_1.handleHttp)(res, 'Error al Eliminar al Alumno');
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
        (0, error_handle_1.handleHttp)(res, 'Error al Insertar al Alumno', e);
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
        (0, error_handle_1.handleHttp)(res, 'Error al Actualizar la contraseña', e);
    }
});
exports.compararPass = compararPass;
