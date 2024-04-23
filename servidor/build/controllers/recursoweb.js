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
exports.getRecursoArchivoGrado = exports.insertRecursoArchivo = exports.updateRecursoArchivo = exports.deleteRecursoArchivo = exports.getRecursoWebGrado = exports.insertRecursoWeb = exports.deleteRecursoWeb = exports.updateRecursoWeb = exports.getRecursoWeb = exports.getRecursosWeb = void 0;
const recursoweb_1 = require("../service/recursoweb");
const error_handle_1 = require("../utils/error.handle");
const getRecursosWeb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoRecursoWeb = yield (0, recursoweb_1.GetRecursosWebService)();
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteRecursoWeb = deleteRecursoWeb;
const insertRecursoWeb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoRecursoWeb = yield (0, recursoweb_1.insertRecursoWebService)(req.body);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
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
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getRecursoWebGrado = getRecursoWebGrado;
//Recursos de archivos
const updateRecursoArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoRecursoWeb = yield (0, recursoweb_1.updateRecursoArchivoService)(req.body, id);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateRecursoArchivo = updateRecursoArchivo;
const deleteRecursoArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoRecursoWeb = yield (0, recursoweb_1.deleteRecursoArchivoService)(id);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteRecursoArchivo = deleteRecursoArchivo;
const insertRecursoArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoRecursoWeb = yield (0, recursoweb_1.insertRecursoArchivoService)(req.body);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertRecursoArchivo = insertRecursoArchivo;
const getRecursoArchivoGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoRecursoWeb = yield (0, recursoweb_1.GetRecursoArchivoServiceGrado)(id);
        res.send(resultadoRecursoWeb);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getRecursoArchivoGrado = getRecursoArchivoGrado;
