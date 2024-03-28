"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const profesores_1 = require("../controllers/profesores");
const log_1 = require("../middleware/log");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/profesor/", session_1.checkJwt, profesores_1.getProfesores);
router.get("/profesor/:id", session_1.checkJwt, profesores_1.getProfesor);
router.get("/gradoguia/:id", session_1.checkJwt, profesores_1.getGradoGuiaProfesor);
router.post("/profesor/", log_1.logMiddleware, profesores_1.insertarProfesor);
router.put("/profesor/:id", session_1.checkJwt, profesores_1.updateProfesor);
router.delete("/profesor/:id", session_1.checkJwt, profesores_1.deleteProfesor);
router.post("/profesor/pass/:id", session_1.checkJwt, profesores_1.compararPass);