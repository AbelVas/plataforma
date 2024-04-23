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
exports.getGradoGuiaProfesor = exports.getGuiaGrado = exports.insertGuiaGrado = exports.deleteGuiaGrado = exports.updateGuiaGrado = void 0;
const guiagrado_1 = require("../service/guiagrado");
const error_handle_1 = require("../utils/error.handle");
const updateGuiaGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrado = yield (0, guiagrado_1.updateGraGuiaService)(req.body, id);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateGuiaGrado = updateGuiaGrado;
const deleteGuiaGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrado = yield (0, guiagrado_1.deleteGraGuiaService)(id);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteGuiaGrado = deleteGuiaGrado;
const insertGuiaGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrado = yield (0, guiagrado_1.insertGraGuiaService)(req.body);
        res.send(resultadoGrado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertGuiaGrado = insertGuiaGrado;
//Por mientras tengo el get
const getGuiaGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, guiagrado_1.getGraGuiaService)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getGuiaGrado = getGuiaGrado;
const getGradoGuiaProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGuia = yield (0, guiagrado_1.getGuiaPorGuia)(id);
        res.send(resultadoGuia);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getGradoGuiaProfesor = getGradoGuiaProfesor;
