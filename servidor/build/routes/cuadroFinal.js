"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cuadroFinal_1 = require("../controllers/cuadroFinal");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/cuadro-final/:idGrado", cuadroFinal_1.notasalumnosCursoFinal);
