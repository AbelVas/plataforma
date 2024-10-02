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
exports.insertarJornada = exports.deleteJornada = exports.updateJornada = exports.getJornada = exports.getJornadas = void 0;
const jornadas_1 = require("../service/jornadas");
const error_handle_1 = require("../utils/error.handle");
// Obtener todas las jornadas
const getJornadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoJornada = yield (0, jornadas_1.obtenerJornadasService)();
        res.status(200).send(resultadoJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getJornadas = getJornadas;
// Obtener una jornada por su ID
const getJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoJornada = yield (0, jornadas_1.obtenerJornadaService)(id);
        if (!resultadoJornada) {
            res.status(404).send({ message: "Jornada no encontrada" });
            return;
        }
        res.status(200).send(resultadoJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getJornada = getJornada;
// Actualizar una jornada
const updateJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoJornada = yield (0, jornadas_1.updateJornadaService)(req.body, id);
        if (resultadoJornada.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo actualizar, jornada no encontrada" });
            return;
        }
        res.status(200).send({ message: "Jornada actualizada con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateJornada = updateJornada;
// Eliminar una jornada
const deleteJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoJornada = yield (0, jornadas_1.deleteJornadaService)(id);
        if (resultadoJornada.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo eliminar, jornada no encontrada" });
            return;
        }
        res.status(200).send({ message: "Jornada eliminada con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteJornada = deleteJornada;
// Insertar una nueva jornada
const insertarJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoJornada = yield (0, jornadas_1.insertJornadaService)(req.body);
        res.status(201).send({ message: "Jornada creada con éxito", id: resultadoJornada.insertId });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertarJornada = insertarJornada;
