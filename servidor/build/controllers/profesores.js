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
exports.getFotoCursoActivaProfesor = exports.fotoCursoProfeController = exports.getGradoGuiaProfesor = exports.compararPass = exports.insertarProfesor = exports.deleteProfesor = exports.updateProfesor = exports.getProfesor = exports.getProfesores = exports.getFotoPerfilActivaProfesor = exports.fotoPerfilProfeController = void 0;
const profesores_1 = require("../service/profesores");
const error_handle_1 = require("../utils/error.handle");
const passwordFunction_1 = require("../utils/passwordFunction");
const app_1 = require("../app"); // Importa el objeto de Socket.io
const getProfesores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoProfesor = yield (0, profesores_1.obtenerProfesoresService)();
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getGradoGuiaProfesor = getGradoGuiaProfesor;
const fotoPerfilProfeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ruta_imagen } = req.body;
        const { idProfesor } = req.body;
        const { peso_archivo } = req.body;
        const { subida } = req.body;
        const fotoPerfilProfesor = yield (0, profesores_1.fotoPerfilProfesorService)(idProfesor, ruta_imagen, peso_archivo, subida);
        app_1.io.emit('actualizar-foto-ferfil-profesor', { usuario: idProfesor, idRol: "2" });
        res.send(fotoPerfilProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.fotoPerfilProfeController = fotoPerfilProfeController;
const getFotoPerfilActivaProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const consulta = yield (0, profesores_1.getFotoPerfilProfesorService)(id);
        res.send(consulta);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getFotoPerfilActivaProfesor = getFotoPerfilActivaProfesor;
//Curso Subida de Archivo
const fotoCursoProfeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ruta_imagen } = req.body;
        const { idCurso } = req.body;
        console.log(req.body);
        const { peso_archivo } = req.body;
        const { subida } = req.body;
        const { idProfesor } = req.body;
        const fotoPerfilProfesor = yield (0, profesores_1.fotoCursoProfesorService)(idCurso, ruta_imagen, peso_archivo, subida);
        app_1.io.emit('cambio-curso-foto', { usuario: idProfesor, idRol: "2" });
        res.send(fotoPerfilProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.fotoCursoProfeController = fotoCursoProfeController;
//obtener archivo curso foto
const getFotoCursoActivaProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const consulta = yield (0, profesores_1.getFotoCursoProfesorService)(id);
        res.send(consulta);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getFotoCursoActivaProfesor = getFotoCursoActivaProfesor;
