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
exports.getNivelesporJornada = exports.insertNivel = exports.deleteNivel = exports.updateNivel = exports.getNivel = exports.getNiveles = void 0;
const niveles_1 = require("../service/niveles");
const error_handle_1 = require("../utils/error.handle");
const app_1 = require("../app"); // Importa el objeto de Socket.io
// Obtener todos los niveles
const getNiveles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseNivel = yield (0, niveles_1.obtenerNivelesService)();
        res.status(200).send(responseNivel);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getNiveles = getNiveles;
// Obtener un nivel por ID
const getNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseNivel = yield (0, niveles_1.obtenerNivelService)(id);
        if (!responseNivel) {
            res.status(404).send({ message: "Nivel no encontrado" });
            return;
        }
        res.status(200).send(responseNivel);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getNivel = getNivel;
// Actualizar un nivel
const updateNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body; // El nombre del usuario que realiza la actualización
        const responseNivel = yield (0, niveles_1.editarNivelService)(req.body, id);
        if (responseNivel.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo actualizar, nivel no encontrado" });
            return;
        }
        // Emitir un evento de Socket.io para notificar a los administradores
        app_1.io.emit("Actualizar-nivel", { mensaje: `El usuario "${nombre}" actualizó un nivel` });
        res.status(200).send({ message: "Nivel actualizado con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateNivel = updateNivel;
// Eliminar un nivel
const deleteNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body; // El nombre del usuario que realiza la eliminación
        const responseNivel = yield (0, niveles_1.eliminarNivelService)(id);
        if (responseNivel.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo eliminar, nivel no encontrado" });
            return;
        }
        // Emitir un evento de Socket.io para notificar a los administradores
        app_1.io.emit("Eliminar-nivel", { mensaje: `El usuario "${nombre}" eliminó un nivel` });
        res.status(200).send({ message: "Nivel eliminado con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteNivel = deleteNivel;
// Insertar un nuevo nivel
const insertNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body; // El nombre del usuario que realiza la inserción
        const responseNivel = yield (0, niveles_1.insertNivelService)(req.body);
        // Emitir un evento de Socket.io para notificar a los administradores
        app_1.io.emit("nuevo-nivel", { mensaje: `El usuario "${nombre}" creó un nuevo nivel` });
        res.status(201).send({ message: "Nivel creado con éxito", id: responseNivel.insertId });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertNivel = insertNivel;
// Obtener niveles por jornada
const getNivelesporJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseNivelporJornada = yield (0, niveles_1.getNivelesporJornadaService)(id);
        if (!responseNivelporJornada.length) {
            res.status(404).send({ message: "No se encontraron niveles para la jornada proporcionada" });
            return;
        }
        res.status(200).send(responseNivelporJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getNivelesporJornada = getNivelesporJornada;
