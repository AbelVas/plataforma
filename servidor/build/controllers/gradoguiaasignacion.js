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
exports.actualizarGradoGuia = exports.eliminarGradoGuia = exports.insertGradosGuias = exports.getGradosSinGuias = exports.getObtenerGuiasExistentes = void 0;
const gradoguiaasignacion_1 = require("../service/gradoguiaasignacion");
const error_handle_1 = require("../utils/error.handle");
const app_1 = require("../app"); // Importar el mapa de sockets
const getObtenerGuiasExistentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, gradoguiaasignacion_1.obtenerGuiasExistente)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener los Grados');
    }
});
exports.getObtenerGuiasExistentes = getObtenerGuiasExistentes;
const getGradosSinGuias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, gradoguiaasignacion_1.obtenerGradosSinGuias)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener los Grados');
    }
});
exports.getGradosSinGuias = getGradosSinGuias;
const insertGradosGuias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUsuario = req.body.idProfesor;
        const insert = yield (0, gradoguiaasignacion_1.insertarGradoGuia)(req.body);
        // Emitir evento de Socket.io solo al usuario con el ID de profesor especificado
        const userSocket = app_1.socketsMap.get(idUsuario);
        if (userSocket) {
            userSocket.emit("notificacion", { mensaje: "Se te ha asignado un nuevo Grado Guía" });
        }
        else {
            res.status(404).send("Socket no encontrado para el usuario.");
        }
        res.send(insert);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Insertar los Grados: ' + e);
    }
});
exports.insertGradosGuias = insertGradosGuias;
const eliminarGradoGuia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrados = yield (0, gradoguiaasignacion_1.deleteGradoGuia)(id);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Eliminar los Grados');
    }
});
exports.eliminarGradoGuia = eliminarGradoGuia;
const actualizarGradoGuia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.idGuias);
        const insert = yield (0, gradoguiaasignacion_1.updateGradoGuia)(req.body, req.body.idGuias);
        res.send(insert);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Actualizar los Grados');
    }
});
exports.actualizarGradoGuia = actualizarGradoGuia;
