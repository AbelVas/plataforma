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
exports.alumnoNotasBoletaPromedioFinal = exports.alumnoNotasBoletaEspecial = exports.alumnoNotasBoleta = exports.alumnoNotasBoletaService = exports.alumnosGrado = void 0;
const error_handle_1 = require("../utils/error.handle");
const boletas_1 = require("../service/boletas");
Object.defineProperty(exports, "alumnoNotasBoletaService", { enumerable: true, get: function () { return boletas_1.alumnoNotasBoletaService; } });
const alumnosGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const { idAlumno } = req.params;
        const prueba = yield (0, boletas_1.alumnosGradoService)(idGrado, idAlumno);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.alumnosGrado = alumnosGrado;
const alumnoNotasBoleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const { idAlumno } = req.params;
        const prueba = yield (0, boletas_1.alumnoNotasBoletaService)(idGrado, idAlumno);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.alumnoNotasBoleta = alumnoNotasBoleta;
const alumnoNotasBoletaEspecial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const { idAlumno } = req.params;
        const prueba = yield (0, boletas_1.alumnoNotasBoletaEspecialService)(idGrado, idAlumno);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.alumnoNotasBoletaEspecial = alumnoNotasBoletaEspecial;
const alumnoNotasBoletaPromedioFinal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const { idCurso } = req.params;
        const prueba = yield (0, boletas_1.alumnoNotasBoletaFinalPromedio)(idCurso, idGrado);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.alumnoNotasBoletaPromedioFinal = alumnoNotasBoletaPromedioFinal;
