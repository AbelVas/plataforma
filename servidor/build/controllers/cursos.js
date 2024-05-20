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
exports.getProfeCurso = exports.getCursosPorAlumno = exports.obtenerCursosPorProfesorGradoSeccion = exports.getCursoporGradoProfesor = exports.getCursoporProfesor = exports.getCursoporGrado = exports.insertCurso = exports.deleteCurso = exports.updateCurso = exports.getCursos = exports.getCurso = exports.getCursoporGradoProfesorAdmin = exports.obtenerCursodeProfesorIndividual = exports.obtenerImagenSubidCursosProfesorController = void 0;
const cursos_1 = require("../service/cursos");
const error_handle_1 = require("../utils/error.handle");
const app_1 = require("../app"); // Importa el objeto de Socket.io
const obtenerCursosPorProfesorGradoSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, cursos_1.obtenerCursosPorProfesorGradoSeccionService)(id, req.body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerCursosPorProfesorGradoSeccion = obtenerCursosPorProfesorGradoSeccion;
const getCursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, cursos_1.obtenerCursosService)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCursos = getCursos;
const getCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrado = yield (0, cursos_1.obtenerCursoService)(id);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCurso = getCurso;
const updateCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoUpGrado = yield (0, cursos_1.updateCursosService)(req.body, id);
        res.send(resultadoUpGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateCurso = updateCurso;
const deleteCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoDeletGrado = yield (0, cursos_1.deleteCursosService)(id);
        res.send(resultadoDeletGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteCurso = deleteCurso;
const insertCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoInsGrado = yield (0, cursos_1.insertCursosService)(req.body);
        res.send(resultadoInsGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertCurso = insertCurso;
const getCursoporGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrado = yield (0, cursos_1.obtenerCursosPorGradoService)(id);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCursoporGrado = getCursoporGrado;
const getCursoporProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoProfesor = yield (0, cursos_1.obtenerCursosPorProfesorService)(id);
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCursoporProfesor = getCursoporProfesor;
const getCursoporGradoProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoProfesor = yield (0, cursos_1.obtenerCursosPorGradoProfesorService)(id);
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCursoporGradoProfesor = getCursoporGradoProfesor;
const getCursosPorAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoAlumno = yield (0, cursos_1.obtenerCursosPorAlumnoService)(id);
        res.send(resultadoAlumno);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCursosPorAlumno = getCursosPorAlumno;
const getProfeCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrado = yield (0, cursos_1.obtenerProfePorCurso)(id);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getProfeCurso = getProfeCurso;
const getCursoporGradoProfesorAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoProfesor = yield (0, cursos_1.obtenerCursosPorGradoProfesorAdminService)(id);
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCursoporGradoProfesorAdmin = getCursoporGradoProfesorAdmin;
const obtenerCursodeProfesorIndividual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoProfesor = yield (0, cursos_1.obtenerCursodeProfesor)(id);
        res.send(resultadoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerCursodeProfesorIndividual = obtenerCursodeProfesorIndividual;
const obtenerImagenSubidCursosProfesorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { ruta_imagen } = req.body;
        const { subida } = req.body;
        const { idRol } = req.body;
        const { idProfesor } = req.body;
        const resultado = yield (0, cursos_1.obtenerImagenSubidCursosProfesor)(id, ruta_imagen, subida);
        app_1.io.emit('actualizar-foto-curso', { usuario: idProfesor, idRol: idRol });
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerImagenSubidCursosProfesorController = obtenerImagenSubidCursosProfesorController;
