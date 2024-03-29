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
exports.getUnidadActiva = exports.deleteUnidad = exports.updateUnidades = exports.postUnidad = exports.getUnidad = exports.getUnidades = void 0;
const unidades_1 = require("../service/unidades");
const error_handle_1 = require("../utils/error.handle");
const getUnidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoUnidades = yield (0, unidades_1.obtenerUnidadesService)();
        res.send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error Al obtener la Unidad');
    }
});
exports.getUnidades = getUnidades;
const getUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoUnidad = yield (0, unidades_1.obtenerUnidadService)(id);
        res.json(resultadoUnidad);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error Al obtener la Unidad');
    }
});
exports.getUnidad = getUnidad;
const postUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseUnidad = yield (0, unidades_1.insertUnidadService)(req.body);
        res.send(responseUnidad);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Insertar la Unidad', e);
    }
});
exports.postUnidad = postUnidad;
const updateUnidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseUpdate = yield (0, unidades_1.updateUnidadService)(req.body, id);
        res.send(responseUpdate);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error Al Actualizar la Unidad');
    }
});
exports.updateUnidades = updateUnidades;
const deleteUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseDelete = yield (0, unidades_1.deleteUnidadService)(id);
        res.send(responseDelete);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Eliminar la Unidad: ', e);
    }
});
exports.deleteUnidad = deleteUnidad;
const getUnidadActiva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoUnidades = yield (0, unidades_1.getUnidadesActivasService)();
        res.send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error Al obtener la Unidades activas', e);
    }
});
exports.getUnidadActiva = getUnidadActiva;
