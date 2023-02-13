"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const recursoweb_1 = require("../controllers/recursoweb");
const session_1 = require("../middleware/session");
// Mi primer Appi Queza
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", session_1.checkJwt, recursoweb_1.getRecursosWeb);
router.get("/:id", session_1.checkJwt, recursoweb_1.getRecursoWeb);
router.put("/:id", session_1.checkJwt, recursoweb_1.updateRecursoWeb);
router.delete("/:id", session_1.checkJwt, recursoweb_1.deleteRecursoWeb);
router.post("/", session_1.checkJwt, recursoweb_1.insertRecursoWeb);
router.get("/recurso-grado/:id", session_1.checkJwt, recursoweb_1.getRecursoWebGrado);
