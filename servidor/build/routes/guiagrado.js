"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const guiagrado_1 = require("../controllers/guiagrado");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
//Por mientras tengo el get
router.get("/", session_1.checkJwt, guiagrado_1.getGuiaGrado);
router.put("/:id", session_1.checkJwt, guiagrado_1.updateGuiaGrado);
router.delete("/:id", session_1.checkJwt, guiagrado_1.deleteGuiaGrado);
router.post("/", session_1.checkJwt, guiagrado_1.insertGuiaGrado);
router.get("/gradoguia-profesor/:id", session_1.checkJwt, guiagrado_1.getGradoGuiaProfesor);
