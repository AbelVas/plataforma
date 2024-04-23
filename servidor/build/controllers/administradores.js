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
exports.compararPass = exports.updateAdmin = exports.getAdmins = exports.getAdmin = exports.deleteAdmin = exports.putAdmin = void 0;
const administradores_1 = require("../service/administradores");
const error_handle_1 = require("../utils/error.handle");
const passwordFunction_1 = require("../utils/passwordFunction");
const putAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validar = yield (0, administradores_1.validarAdminExisteSi)(req.body.usuario, req.body.CUI);
        if (validar != '') {
            res.send("Error, Usuario ya existe");
        }
        else {
            const passEncrypt = yield (0, passwordFunction_1.encrypt)(req.body.pass);
            req.body.pass = passEncrypt;
            const resultadoAdminInsert = yield (0, administradores_1.insertarAdminService)(req.body);
            res.send(resultadoAdminInsert);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.putAdmin = putAdmin;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultado = yield (0, administradores_1.getAdminService)(id);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAdmin = getAdmin;
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, administradores_1.getAdminsService)();
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAdmins = getAdmins;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { pass } = req.body;
        if (pass == null) {
            const resultado = yield (0, administradores_1.updateAdminService)(req.body, id);
            res.send(resultado);
        }
        else {
            const passEncrypt = yield (0, passwordFunction_1.encrypt)(pass);
            req.body.pass = passEncrypt;
            const resultado = yield (0, administradores_1.updateAdminService)(req.body, id);
            res.send(resultado);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoDelete = yield (0, administradores_1.eliminarAdminService)(id);
        res.send(resultadoDelete);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteAdmin = deleteAdmin;
const compararPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { pass } = req.body;
        const resultadoDelete = yield (0, administradores_1.verifyPassword)(id, pass);
        res.send(resultadoDelete);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.compararPass = compararPass;
