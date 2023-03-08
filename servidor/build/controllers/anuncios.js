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
exports.getAnuncioGrado = exports.insertAnuncio = exports.deleteAnuncio = exports.updateAnuncio = exports.getAnuncio = exports.getAnuncios = void 0;
const anuncios_1 = require("../service/anuncios");
const error_handle_1 = require("../utils/error.handle");
const getAnuncios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoAnuncio = yield (0, anuncios_1.GetAnunciosService)();
        res.send(resultadoAnuncio);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener los Anuncios', e);
    }
});
exports.getAnuncios = getAnuncios;
const getAnuncio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoAnuncio = yield (0, anuncios_1.GetAnuncioService)(id);
        res.send(resultadoAnuncio);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener el Anuncio', e);
    }
});
exports.getAnuncio = getAnuncio;
const updateAnuncio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoAnuncio = yield (0, anuncios_1.updateAnuncioService)(req.body, id);
        res.send(resultadoAnuncio);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Actualizar el Anuncio', e);
    }
});
exports.updateAnuncio = updateAnuncio;
const deleteAnuncio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoAnuncio = yield (0, anuncios_1.deleteAnuncioService)(id);
        res.send(resultadoAnuncio);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Eliminar el Anuncio', e);
    }
});
exports.deleteAnuncio = deleteAnuncio;
const insertAnuncio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoAnuncio = yield (0, anuncios_1.insertAnuncioService)(req.body);
        res.send(resultadoAnuncio);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Crear el Anuncio', e);
    }
});
exports.insertAnuncio = insertAnuncio;
const getAnuncioGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoAnuncio = yield (0, anuncios_1.GetAnuncioServiceGrado)(id);
        res.send(resultadoAnuncio);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener el Anuncio', e);
    }
});
exports.getAnuncioGrado = getAnuncioGrado;
