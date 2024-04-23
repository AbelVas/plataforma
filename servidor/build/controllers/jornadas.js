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
exports.insertarJornada = exports.deleteJornada = exports.updateJornada = exports.getJornada = exports.getJornadas = void 0;
const jornadas_1 = require("../service/jornadas");
const error_handle_1 = require("../utils/error.handle");
const getJornadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoJornada = yield (0, jornadas_1.obtenerJornadasService)();
        res.send(resultadoJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getJornadas = getJornadas;
const getJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoJornada = yield (0, jornadas_1.obtenerJornadaService)(id);
        res.send(resultadoJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getJornada = getJornada;
const updateJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoJornada = yield (0, jornadas_1.updateJornadaService)(req.body, id);
        res.send(resultadoJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateJornada = updateJornada;
const deleteJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoJornada = yield (0, jornadas_1.deleteJornadaService)(id);
        res.send(resultadoJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteJornada = deleteJornada;
const insertarJornada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoJornada = yield (0, jornadas_1.insertJornadaService)(req.body);
        res.send(resultadoJornada);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertarJornada = insertarJornada;
