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
exports.getGradoProfesor = exports.getGradoJornada = exports.getGradosNivel = exports.insertarGrado = exports.deleteGrado = exports.updateGrado = exports.getGrado = exports.getGrados = void 0;
const grados_1 = require("../service/grados");
const error_handle_1 = require("../utils/error.handle");
// Mi primer Appi Queza
const getGrados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, grados_1.GetGradosService)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener los Grados');
    }
});
exports.getGrados = getGrados;
const getGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrado = yield (0, grados_1.GetGradoService)(id);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener el Grado');
    }
});
exports.getGrado = getGrado;
const updateGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrado = yield (0, grados_1.updateGradoService)(req.body, id);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Actualizar el Curso');
    }
});
exports.updateGrado = updateGrado;
const deleteGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrado = yield (0, grados_1.deleteGradoService)(id);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Eliminar el Curso');
    }
});
exports.deleteGrado = deleteGrado;
const insertarGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrado = yield (0, grados_1.insertGradoService)(req.body);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Crear el Grado', e);
    }
});
exports.insertarGrado = insertarGrado;
const getGradosNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGradoNivel = yield (0, grados_1.getGradoNivelService)(id);
        res.send(resultadoGradoNivel);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al buscar el Grado por nivel', e);
    }
});
exports.getGradosNivel = getGradosNivel;
const getGradoProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGradoProfesor = yield (0, grados_1.getGradoProfesorService)(id);
        res.send(resultadoGradoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al buscar al Grado por Profesor', e);
    }
});
exports.getGradoProfesor = getGradoProfesor;
const getGradoJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGradoProfesor = yield (0, grados_1.getGradoxJornada)(id);
        res.send(resultadoGradoProfesor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al buscar al Grado por Profesor', e);
    }
});
exports.getGradoJornada = getGradoJornada;
