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
exports.getCursoBimestreConsolidado = void 0;
const cuadroguia_1 = require("../service/cuadroguia");
const error_handle_1 = require("../utils/error.handle");
const getCursoBimestreConsolidado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const idUnidad = req.body.idUnidad;
        const idCurso = req.body.idCurso;
        const obtenerCursosNotas = yield (0, cuadroguia_1.obtenerCursosNotasService)(idGrado, idUnidad, idCurso);
        res.send(obtenerCursosNotas);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener el consolidado', e);
    }
});
exports.getCursoBimestreConsolidado = getCursoBimestreConsolidado;
