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
exports.insertSeccion = exports.deleteSeccion = exports.updateSeccion = exports.getSeccion = exports.getSecciones = void 0;
const secciones_1 = require("../service/secciones");
const error_handle_1 = require("../utils/error.handle");
// Obtener todas las secciones
const getSecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secciones = yield (0, secciones_1.getSeccionesService)();
        res.status(200).send(secciones);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getSecciones = getSecciones;
// Obtener una sección por ID
const getSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const seccion = yield (0, secciones_1.getSeccionService)(id);
        if (!seccion) {
            res.status(404).send({ message: "Sección no encontrada" });
            return;
        }
        res.status(200).send(seccion);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getSeccion = getSeccion;
// Actualizar una sección por su ID
const updateSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, secciones_1.updateSeccionService)(id, req.body);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo actualizar, sección no encontrada" });
            return;
        }
        res.status(200).send({ message: "Sección actualizada con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateSeccion = updateSeccion;
// Eliminar una sección por su ID
const deleteSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, secciones_1.deleteSeccionService)(id);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo eliminar, sección no encontrada" });
            return;
        }
        res.status(200).send({ message: "Sección eliminada con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteSeccion = deleteSeccion;
// Insertar una nueva sección
const insertSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, secciones_1.insertarSeccionService)(req.body);
        res.status(201).send({ message: "Sección creada con éxito", id: result.insertId });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertSeccion = insertSeccion;
