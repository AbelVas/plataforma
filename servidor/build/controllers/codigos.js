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
exports.insertCodigo = exports.deleteCodigo = exports.updateCodigo = exports.getCodigos = exports.getCodigo = void 0;
const codigos_1 = require("../service/codigos");
const error_handle_1 = require("../utils/error.handle");
const getCodigos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoCodigos = yield (0, codigos_1.obtenerCodigosService)();
        res.send(resultadoCodigos);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener los Codigos');
    }
});
exports.getCodigos = getCodigos;
const getCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoCodigo = yield (0, codigos_1.obtenerCodigoService)(req.body.codigo, req.body.idTipoCodigo);
        res.send(resultadoCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener el Codigo');
    }
});
exports.getCodigo = getCodigo;
const updateCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoUpCodigo = yield (0, codigos_1.updateCodigoService)(req.body, id);
        res.send(resultadoUpCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al actualizar el Codigo');
    }
});
exports.updateCodigo = updateCodigo;
const deleteCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resulDeletCodigo = yield (0, codigos_1.deleteCodigoService)(id);
        res.send(resulDeletCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al eliminar el Codigo');
    }
});
exports.deleteCodigo = deleteCodigo;
const insertCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoInsCodigo = yield (0, codigos_1.insertCodigoService)(req.body);
        res.send(resultadoInsCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al insertar el Codigo');
    }
});
exports.insertCodigo = insertCodigo;