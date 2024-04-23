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
exports.obtenerContrasenaProfesorCambiada = exports.obtenerCodigosEnDesuso = exports.obtenerCodigosEnUso = exports.obtenerAlumnosMujeres = exports.obtenerAlumnosHombres = exports.obtenerAlumnosTotalPorGrado = exports.obtenerAlumnosTotal = exports.GetCantidadDocentes = exports.GetCantidadGrados = void 0;
const error_handle_1 = require("../utils/error.handle");
const estadistica_1 = require("../service/estadistica");
const obtenerAlumnosTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, estadistica_1.GetAlumnosTotal)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAlumnosTotal = obtenerAlumnosTotal;
const obtenerAlumnosTotalPorGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, estadistica_1.GetAlumnosTotalPorGrado)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAlumnosTotalPorGrado = obtenerAlumnosTotalPorGrado;
const obtenerAlumnosHombres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, estadistica_1.GetAlumnosHombres)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAlumnosHombres = obtenerAlumnosHombres;
const obtenerAlumnosMujeres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, estadistica_1.GetAlumnosMujeres)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAlumnosMujeres = obtenerAlumnosMujeres;
const obtenerCodigosEnUso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, estadistica_1.GetCodigosEnUso)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerCodigosEnUso = obtenerCodigosEnUso;
const obtenerCodigosEnDesuso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, estadistica_1.GetCodigosEnDesuso)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerCodigosEnDesuso = obtenerCodigosEnDesuso;
const obtenerContrasenaProfesorCambiada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, estadistica_1.GetContrasenaProfesorCambiada)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerContrasenaProfesorCambiada = obtenerContrasenaProfesorCambiada;
/*
const obtenerContrasenaProfesorNoCambiada=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetContrasenaProfesorNoCambiada();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
*/
const GetCantidadGrados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetCantidadGradosService)();
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.GetCantidadGrados = GetCantidadGrados;
const GetCantidadDocentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, estadistica_1.GetCantidadDocentesService)();
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.GetCantidadDocentes = GetCantidadDocentes;
