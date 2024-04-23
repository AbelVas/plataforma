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
exports.insertTema = exports.deleteTema = exports.updateTema = exports.getTemaActivo = exports.getTema = exports.getTemas = void 0;
const temas_1 = require("../service/temas");
const error_handle_1 = require("../utils/error.handle");
const getTemas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoTemas = yield (0, temas_1.getTemasService)();
        res.send(resultadoTemas);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getTemas = getTemas;
const getTema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoTemas = yield (0, temas_1.getTemaService)(id);
        res.send(resultadoTemas);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getTema = getTema;
const getTemaActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activo } = req.params;
        const resultadoTemas = yield (0, temas_1.getTemaActivoService)(activo);
        res.send(resultadoTemas);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getTemaActivo = getTemaActivo;
const updateTema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoTemas = yield (0, temas_1.updateTemaService)(id, req.body);
        res.send(resultadoTemas);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateTema = updateTema;
const deleteTema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoTemas = yield (0, temas_1.deleteTemaService)(id);
        res.send(resultadoTemas);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteTema = deleteTema;
const insertTema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoTemas = yield (0, temas_1.insertarTemaService)(req.body);
        res.send(resultadoTemas);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertTema = insertTema;
