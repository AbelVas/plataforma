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
exports.notasalumnosCursoFinal = exports.cursosGradoCuadroGuia = exports.alumnosGrado = exports.notasalumnosFinal = exports.actividadesCursoGrado = exports.getCursoBimestreConsolidado = void 0;
const cuadroguia_1 = require("../service/cuadroguia");
const error_handle_1 = require("../utils/error.handle");
const getCursoBimestreConsolidado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const { idCurso } = req.params;
        const obtenerCursosNotas = yield (0, cuadroguia_1.GradoCursoSeccionService)(idGrado, idCurso);
        res.send(obtenerCursosNotas);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener el Grado y Sección', e);
    }
});
exports.getCursoBimestreConsolidado = getCursoBimestreConsolidado;
const actividadesCursoGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCurso } = req.params;
        const { idUnidad } = req.params;
        const obtenerActividadesCurso = yield (0, cuadroguia_1.actividadesCursoGradoService)(idCurso, idUnidad);
        res.send(obtenerActividadesCurso);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener Actividades el Curso', e);
    }
});
exports.actividadesCursoGrado = actividadesCursoGrado;
const notasalumnosFinal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCurso } = req.params;
        const { idUnidad } = req.params;
        const { idGrado } = req.params;
        const { idAlumnos } = req.params;
        console.log(idAlumnos);
        const prueba = yield (0, cuadroguia_1.notasalumnosFinalService)(idCurso, idUnidad, idGrado);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error', e);
    }
});
exports.notasalumnosFinal = notasalumnosFinal;
const alumnosGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const prueba = yield (0, cuadroguia_1.alumnosGradoService)(idGrado);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error', e);
    }
});
exports.alumnosGrado = alumnosGrado;
const cursosGradoCuadroGuia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        console.log(idGrado);
        const prueba = yield (0, cuadroguia_1.cursosGradoCuadroGuiaService)(idGrado);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error', e);
    }
});
exports.cursosGradoCuadroGuia = cursosGradoCuadroGuia;
const notasalumnosCursoFinal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const { idUnidad } = req.params;
        const prueba = yield (0, cuadroguia_1.notasalumnosCursoFinalService)(idGrado, idUnidad);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error', e);
    }
});
exports.notasalumnosCursoFinal = notasalumnosCursoFinal;
