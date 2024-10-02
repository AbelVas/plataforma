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
// Obtener todos los códigos
const getCodigos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoCodigos = yield (0, codigos_1.obtenerCodigosService)();
        res.status(200).send(resultadoCodigos);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCodigos = getCodigos;
// Obtener un código específico por su valor y tipo
const getCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigo, idTipoCodigo } = req.body;
        const resultadoCodigo = yield (0, codigos_1.obtenerCodigoService)(codigo, idTipoCodigo);
        if (!resultadoCodigo) {
            res.status(404).send({ message: "Código no encontrado o inactivo" });
            return;
        }
        res.status(200).send(resultadoCodigo);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCodigo = getCodigo;
// Actualizar un código por su ID
const updateCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoUpCodigo = yield (0, codigos_1.updateCodigoService)(req.body, id);
        if (resultadoUpCodigo.affectedRows === 0) {
            res.status(404).send({ message: "Código no encontrado" });
            return;
        }
        res.status(200).send({ message: "Código actualizado con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateCodigo = updateCodigo;
// Eliminar un código por su ID
const deleteCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resulDeletCodigo = yield (0, codigos_1.deleteCodigoService)(id);
        if (resulDeletCodigo.affectedRows === 0) {
            res.status(404).send({ message: "Código no encontrado" });
            return;
        }
        res.status(200).send({ message: "Código eliminado con éxito" });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteCodigo = deleteCodigo;
// Insertar un nuevo código
const insertCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoInsCodigo = yield (0, codigos_1.insertCodigoService)(req.body);
        res.status(201).send({ message: "Código creado con éxito", id: resultadoInsCodigo.insertId });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertCodigo = insertCodigo;
