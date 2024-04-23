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
exports.insertartipoCodigo = exports.deletetipocodigo = exports.upadteTipoCodigo = exports.getTiposCodigos = exports.getTipoCodigo = void 0;
const tiposcodigos_1 = require("../service/tiposcodigos");
const error_handle_1 = require("../utils/error.handle");
const getTiposCodigos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoTiposCodigos = yield (0, tiposcodigos_1.obtenertiposcodigoService)();
        res.send(resultadoTiposCodigos);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getTiposCodigos = getTiposCodigos;
const getTipoCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoTipoCodigo = yield (0, tiposcodigos_1.obtenertipocodigoService)(id);
        res.send(resultadoTipoCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getTipoCodigo = getTipoCodigo;
const upadteTipoCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoupTipoCodigo = yield (0, tiposcodigos_1.updatetipocodigoService)(req.body, id);
        res.send(resultadoupTipoCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.upadteTipoCodigo = upadteTipoCodigo;
const deletetipocodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoDeletetipoCodigo = yield (0, tiposcodigos_1.deletetipocodigoService)(id);
        res.send(resultadoDeletetipoCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deletetipocodigo = deletetipocodigo;
const insertartipoCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoInstipoCodigo = yield (0, tiposcodigos_1.inserttipocodigoService)(req.body);
        res.send(resultadoInstipoCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertartipoCodigo = insertartipoCodigo;
