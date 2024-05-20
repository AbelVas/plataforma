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
exports.CreateForo = exports.DelForo = exports.UpdateForo = exports.GetForosCurso = exports.GetForo = void 0;
const foros_1 = require("../service/foros");
const error_handle_1 = require("../utils/error.handle");
const CreateForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, foros_1.CrearForo)(req.body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.CreateForo = CreateForo;
const GetForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, foros_1.ObtenerForo)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.GetForo = GetForo;
const GetForosCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, foros_1.ObtenerForosCurso)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.GetForosCurso = GetForosCurso;
const UpdateForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, foros_1.EditarForo)(req.body, id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.UpdateForo = UpdateForo;
const DelForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, foros_1.EliminarForo)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.DelForo = DelForo;
