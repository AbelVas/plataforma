"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jornadas_1 = require("../controllers/jornadas");
const rolCheck_1 = require("../middleware/rolCheck");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", session_1.checkJwt, (0, rolCheck_1.checkRol)(['1', '2']), jornadas_1.getJornadas);
router.get("/:id", session_1.checkJwt, (0, rolCheck_1.checkRol)(['1', '2']), jornadas_1.getJornada);
router.post("/", session_1.checkJwt, (0, rolCheck_1.checkRol)(['1']), jornadas_1.insertarJornada);
router.put("/:id", session_1.checkJwt, (0, rolCheck_1.checkRol)(['1']), jornadas_1.updateJornada);
router.delete("/:id", session_1.checkJwt, (0, rolCheck_1.checkRol)(['1']), jornadas_1.deleteJornada);