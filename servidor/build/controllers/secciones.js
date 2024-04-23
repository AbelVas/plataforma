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
const getSecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrados = yield (0, secciones_1.getSeccionesService)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getSecciones = getSecciones;
const getSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrados = yield (0, secciones_1.getSeccionService)(id);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getSeccion = getSeccion;
const updateSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrados = yield (0, secciones_1.updateSeccionService)(id, req.body);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateSeccion = updateSeccion;
const deleteSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrados = yield (0, secciones_1.deleteSeccionService)(id);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteSeccion = deleteSeccion;
const insertSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, secciones_1.insertarSeccionService)(req.body);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertSeccion = insertSeccion;
