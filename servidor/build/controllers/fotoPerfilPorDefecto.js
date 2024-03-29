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
exports.obtenerImagenCategoria = void 0;
const fotoPerfilPorDefecto_1 = require("../service/fotoPerfilPorDefecto");
const error_handle_1 = require("../utils/error.handle");
const obtenerImagenCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, fotoPerfilPorDefecto_1.obtenerImagenCategoriaService)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al Obtener los Cursos', e);
    }
});
exports.obtenerImagenCategoria = obtenerImagenCategoria;
