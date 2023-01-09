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
exports.getActividadesCalificacionTotal = exports.getActividadesCalificacion = exports.getActividadesPorForo = exports.getActividadesPorTarea = exports.getActividadesPorExamen = exports.getActividadesProfesor = exports.getActividadesTutor = exports.getActividadesAlumno = void 0;
const calendario_1 = require("../service/calendario");
const error_handle_1 = require("../utils/error.handle");
const getActividadesAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultado = yield (0, calendario_1.getActividadesPorAlumno)(id);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener las actividades del Curso', e);
    }
});
exports.getActividadesAlumno = getActividadesAlumno;
const getActividadesTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultado = yield (0, calendario_1.getActividadesPorTutor)(id);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener las actividades del Curso', e);
    }
});
exports.getActividadesTutor = getActividadesTutor;
const getActividadesProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultado = yield (0, calendario_1.getActividadesPorProfesor)(id);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener las actividades del Curso', e);
    }
});
exports.getActividadesProfesor = getActividadesProfesor;
const getActividadesPorExamen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { al } = req.params;
        const resultado = yield (0, calendario_1.getActividadesPorTipoExamen)(id, al);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener las actividades del Curso', e);
    }
});
exports.getActividadesPorExamen = getActividadesPorExamen;
const getActividadesPorTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { al } = req.params;
        const resultado = yield (0, calendario_1.getActividadesPorTipoTarea)(id, al);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener las actividades del Curso', e);
    }
});
exports.getActividadesPorTarea = getActividadesPorTarea;
const getActividadesPorForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { al } = req.params;
        const resultado = yield (0, calendario_1.getActividadesPorTipoForo)(id, al);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener las actividades del Curso', e);
    }
});
exports.getActividadesPorForo = getActividadesPorForo;
const getActividadesCalificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { al } = req.params;
        const resultado = yield (0, calendario_1.getActividadesCalificacionAlumno)(id, al);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener las actividades del Curso', e);
    }
});
exports.getActividadesCalificacion = getActividadesCalificacion;
const getActividadesCalificacionTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { al } = req.params;
        const resultado = yield (0, calendario_1.getActividadesCalificacionAlumnoTotal)(id, al);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener las actividades del Curso', e);
    }
});
exports.getActividadesCalificacionTotal = getActividadesCalificacionTotal;
