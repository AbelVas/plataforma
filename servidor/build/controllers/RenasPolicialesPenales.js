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
exports.obtenerAntecedentesPoliciacosController = exports.obtenerAntecedentesPenalesController = exports.obtenerRenasController = exports.insertarRenasController = exports.insertarAPoliciacosController = exports.insertarAPenalesController = exports.EliminarArchivoVontroller = void 0;
const RenasPolicialesPenales_1 = require("../service/RenasPolicialesPenales");
const error_handle_1 = require("../utils/error.handle");
const obtenerRenasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const nombre = 'renas';
        const resultadoGrados = yield (0, RenasPolicialesPenales_1.obtenerRenasService)(id, nombre);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerRenasController = obtenerRenasController;
const obtenerAntecedentesPenalesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const nombre = 'penales';
        const resultadoGrados = yield (0, RenasPolicialesPenales_1.obtenerAntecedentesPenalesService)(id, nombre);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAntecedentesPenalesController = obtenerAntecedentesPenalesController;
const obtenerAntecedentesPoliciacosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const nombre = 'policiacos';
        const resultadoGrados = yield (0, RenasPolicialesPenales_1.obtenerAntecedentesPoliciacosService)(id, nombre);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerAntecedentesPoliciacosController = obtenerAntecedentesPoliciacosController;
const insertarAPenalesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { peso_archivo } = req.body;
        const { ruta_archivo } = req.body;
        const resultado = yield (0, RenasPolicialesPenales_1.insertarAPenalesService)(id, 'penales', peso_archivo, ruta_archivo);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertarAPenalesController = insertarAPenalesController;
const insertarAPoliciacosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { peso_archivo } = req.body;
        const { ruta_archivo } = req.body;
        const resultado = yield (0, RenasPolicialesPenales_1.insertarAPoliciacosService)(id, 'policiacos', peso_archivo, ruta_archivo);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertarAPoliciacosController = insertarAPoliciacosController;
const insertarRenasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { peso_archivo } = req.body;
        const { ruta_archivo } = req.body;
        const resultado = yield (0, RenasPolicialesPenales_1.insertarRenasService)(id, 'renas', peso_archivo, ruta_archivo);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertarRenasController = insertarRenasController;
const EliminarArchivoVontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { tipoArchivo } = req.params;
        const query = yield (0, RenasPolicialesPenales_1.eliminarArchivo)(id, tipoArchivo);
        res.send(query);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.EliminarArchivoVontroller = EliminarArchivoVontroller;
