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
exports.obtenerContrasenaProfesorCambiada = exports.obtenerCodigosEnDesuso = exports.obtenerCodigosEnUso = exports.obtenerAlumnosMujeres = exports.obtenerAlumnosHombres = exports.obtenerAlumnosTotalPorSexo = exports.obtenerAlumnosTotal = exports.GetCantidadDocentes = exports.GetCantidadGrados = exports.getAlmacenamientoPlataformaController = void 0;
const error_handle_1 = require("../utils/error.handle");
const estadistica_1 = require("../service/estadistica");
// Obtener el total de alumnos
const obtenerAlumnosTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetAlumnosTotal)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAlumnosTotal = obtenerAlumnosTotal;
// Obtener el total de alumnos por sexo
const obtenerAlumnosTotalPorSexo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetAlumnosTotalPorSexo)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAlumnosTotalPorSexo = obtenerAlumnosTotalPorSexo;
// Obtener el total de alumnos hombres
const obtenerAlumnosHombres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetAlumnosHombres)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAlumnosHombres = obtenerAlumnosHombres;
// Obtener el total de alumnas mujeres
const obtenerAlumnosMujeres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetAlumnosMujeres)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAlumnosMujeres = obtenerAlumnosMujeres;
// Obtener el total de códigos en uso
const obtenerCodigosEnUso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetCodigosEnUso)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerCodigosEnUso = obtenerCodigosEnUso;
// Obtener el total de códigos en desuso
const obtenerCodigosEnDesuso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetCodigosEnDesuso)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerCodigosEnDesuso = obtenerCodigosEnDesuso;
// Obtener el número de profesores que han cambiado su contraseña
const obtenerContrasenaProfesorCambiada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetContrasenaProfesorCambiada)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerContrasenaProfesorCambiada = obtenerContrasenaProfesorCambiada;
// Obtener el total de grados en la escuela
const GetCantidadGrados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetCantidadGradosService)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.GetCantidadGrados = GetCantidadGrados;
// Obtener el total de docentes
const GetCantidadDocentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetCantidadDocentesService)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.GetCantidadDocentes = GetCantidadDocentes;
// Obtener el almacenamiento total en la plataforma
const getAlmacenamientoPlataformaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.getAlmacenamientoGigasService)();
        res.status(200).send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAlmacenamientoPlataformaController = getAlmacenamientoPlataformaController;
