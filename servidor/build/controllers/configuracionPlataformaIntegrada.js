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
exports.getExtensionesDocumentos = exports.getExtensionesImagenes = exports.getConfiguracionesController = void 0;
const configuracionPlataformaIntegrada_1 = require("../service/configuracionPlataformaIntegrada");
const error_handle_1 = require("../utils/error.handle");
const getConfiguracionesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entré acá");
    try {
        const resultado = yield (0, configuracionPlataformaIntegrada_1.getConfiguracionesService)();
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getConfiguracionesController = getConfiguracionesController;
const getExtensionesImagenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, configuracionPlataformaIntegrada_1.getExtensionesImagenesService)();
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getExtensionesImagenes = getExtensionesImagenes;
const getExtensionesDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, configuracionPlataformaIntegrada_1.getExtensionesDocumentosService)();
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getExtensionesDocumentos = getExtensionesDocumentos;
