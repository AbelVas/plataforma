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
const getNiveles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseNivel = yield (0, niveles_1.obtenerNivelesService)();
        res.send(responseNivel);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error_Request_GETS ', e);
    }
});
exports.getNiveles = getNiveles;
const getNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseNivel = yield (0, niveles_1.obtenerNivelService)(id);
        res.send(responseNivel);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error_Request_GET ', e);
    }
});
exports.getNivel = getNivel;
const updateNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { idUsuario } = req.params;
        const { nombre } = req.params;
        const responseNivel = yield (0, niveles_1.editarNivelService)(req.body, id);
        // Emitir un evento de Socket.io para notificar a los administradores
        app_1.io.emit("Actualizar-nivel", { mensaje: 'El usuario "' + nombre + '" Actualizó un Nivel' });
        res.send(responseNivel);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error_Request_UPDATE ', e);
    }
});
exports.updateNivel = updateNivel;
const deleteNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { idUsuario } = req.params;
        const { nombre } = req.params;
        const responseNivel = yield (0, niveles_1.eliminarNivelService)(id);
        // Emitir un evento de Socket.io para notificar a los administradores
        app_1.io.emit("Eliminar-nivel", { mensaje: 'El usuario "' + nombre + '" eliminó un Nivel' });
        res.send(responseNivel);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error_Request_DELETE ', e);
    }
});
exports.deleteNivel = deleteNivel;
const insertNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseNivel = yield (0, niveles_1.insertNivelService)(req.body);
        const { idUsuario } = req.params;
        const { nombre } = req.params;
        // Emitir un evento de Socket.io para notificar a los administradores
        app_1.io.emit("nuevo-nivel", { mensaje: 'El usuario "' + nombre + '" eliminó un Nivel' });
        res.send(responseNivel);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error_Request_INSERT ', e);
    }
});
exports.insertNivel = insertNivel;
const getNivelesporJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseNivelporJornada = yield (0, niveles_1.getNivelesporJornadaService)(id);
        res.send(responseNivelporJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error_Request_GetNivelPorJornada ', e);
    }
});
exports.getNivelesporJornada = getNivelesporJornada;
