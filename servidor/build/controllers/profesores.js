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
exports.getGradoGuiaProfesor = exports.compararPass = exports.insertarProfesor = exports.deleteProfesor = exports.updateProfesor = exports.getProfesor = exports.getProfesores = void 0;
const profesores_1 = require("../service/profesores");
const error_handle_1 = require("../utils/error.handle");
const passwordFunction_1 = require("../utils/passwordFunction");
const getProfesores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoProfesor = yield (0, profesores_1.obtenerProfesoresService)();
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener a los Profesores');
    }
});
exports.getProfesores = getProfesores;
const getProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoProfesor = yield (0, profesores_1.obtenerProfesorService)(id);
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener al Profesor');
    }
});
exports.getProfesor = getProfesor;
const updateProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { pass } = req.body;
        if (pass == null) {
            const resultado = yield (0, profesores_1.updateProfesorService)(req.body, id);
            res.send(resultado);
        }
        else {
            const passEncrypt = yield (0, passwordFunction_1.encrypt)(pass);
            req.body.pass = passEncrypt;
            const resultado = yield (0, profesores_1.updateProfesorService)(req.body, id);
            res.send(resultado);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Editar Profesor', e);
    }
});
exports.updateProfesor = updateProfesor;
const deleteProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoProfesor = yield (0, profesores_1.deleteProfesorService)(id);
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Eliminar al Profesor');
    }
});
exports.deleteProfesor = deleteProfesor;
const insertarProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validar = yield (0, profesores_1.validarAdminExisteSi)(req.body.usuario, req.body.CUI, req.body.telefono);
        if (validar != '') {
            res.send("Error, Usuario ya existe");
        }
        else {
            const passEncrypt = yield (0, passwordFunction_1.encrypt)(req.body.pass);
            req.body.pass = passEncrypt;
            const resultadoProfesor = yield (0, profesores_1.insertProfesorService)(req.body);
            res.send(resultadoProfesor);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Insertar al Profesor', e);
    }
});
exports.insertarProfesor = insertarProfesor;
const compararPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { pass } = req.body;
        const resultadoDelete = yield (0, profesores_1.verifyPassword)(id, pass);
        res.send(resultadoDelete);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Actualizar la contraseña', e);
    }
});
exports.compararPass = compararPass;
const getGradoGuiaProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoProfesor = yield (0, profesores_1.getGradoGuiaProfesorService)(id);
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Grado Guia');
    }
});
exports.getGradoGuiaProfesor = getGradoGuiaProfesor;
