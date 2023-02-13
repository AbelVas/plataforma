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
exports.getRecursoWebGrado = exports.insertRecursoWeb = exports.deleteRecursoWeb = exports.updateRecursoWeb = exports.getRecursoWeb = exports.getRecursosWeb = void 0;
const recursoweb_1 = require("../service/recursoweb");
const error_handle_1 = require("../utils/error.handle");
const getRecursosWeb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoRecursoWeb = yield (0, recursoweb_1.GetRecursosWebService)();
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener los Recursos Web', e);
    }
});
exports.getRecursosWeb = getRecursosWeb;
const getRecursoWeb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoRecursoWeb = yield (0, recursoweb_1.GetRecursoWebService)(id);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener el Recurso Web', e);
    }
});
exports.getRecursoWeb = getRecursoWeb;
const updateRecursoWeb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoRecursoWeb = yield (0, recursoweb_1.updateRecursoWebService)(req.body, id);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Actualizar el Recurso Web', e);
    }
});
exports.updateRecursoWeb = updateRecursoWeb;
const deleteRecursoWeb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoRecursoWeb = yield (0, recursoweb_1.deleteRecursoWebService)(id);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Eliminar el Recurso Web', e);
    }
});
exports.deleteRecursoWeb = deleteRecursoWeb;
const insertRecursoWeb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoRecursoWeb = yield (0, recursoweb_1.insertRecursoWebService)(req.body);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Crear el Recurso Web', e);
    }
});
exports.insertRecursoWeb = insertRecursoWeb;
const getRecursoWebGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoRecursoWeb = yield (0, recursoweb_1.GetRecursoWebServiceGrado)(id);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener el Recurso Web', e);
    }
});
exports.getRecursoWebGrado = getRecursoWebGrado;
