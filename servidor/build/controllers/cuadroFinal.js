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
exports.notasalumnosCursoFinal = void 0;
const cuadroFinal_1 = require("../service/cuadroFinal");
const error_handle_1 = require("../utils/error.handle");
const notasalumnosCursoFinal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idGrado } = req.params;
        const prueba = yield (0, cuadroFinal_1.notasalumnosFinalService)(idGrado);
        res.send(prueba);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.notasalumnosCursoFinal = notasalumnosCursoFinal;
