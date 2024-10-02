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
// Obtener todas las unidades
const getUnidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoUnidades = yield (0, unidades_1.obtenerUnidadesService)();
        res.status(200).send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getUnidades = getUnidades;
// Obtener una unidad por su ID
const getUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoUnidad = yield (0, unidades_1.obtenerUnidadService)(id);
        if (!resultadoUnidad) {
            res.status(404).send({ message: "Unidad no encontrada" });
            return;
        }
        res.status(200).json(resultadoUnidad);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getUnidad = getUnidad;
// Insertar una nueva unidad
const postUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseUnidad = yield (0, unidades_1.insertUnidadService)(req.body);
        res.status(201).send({ message: "Unidad creada con éxito", id: responseUnidad.insertId });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.postUnidad = postUnidad;
// Actualizar una unidad por su ID
const updateUnidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseUpdate = yield (0, unidades_1.updateUnidadService)(req.body, id);
        if (responseUpdate.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo actualizar, unidad no encontrada" });
            return;
        }
        res.status(200).send({ message: "Unidad actualizada con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateUnidades = updateUnidades;
// Eliminar una unidad por su ID
const deleteUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseDelete = yield (0, unidades_1.deleteUnidadService)(id);
        if (responseDelete.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo eliminar, unidad no encontrada" });
            return;
        }
        res.status(200).send({ message: "Unidad eliminada con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteUnidad = deleteUnidad;
// Obtener todas las unidades activas
const getUnidadActiva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoUnidades = yield (0, unidades_1.getUnidadesActivasService)();
        res.status(200).send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getUnidadActiva = getUnidadActiva;
