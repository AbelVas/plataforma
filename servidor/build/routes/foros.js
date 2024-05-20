"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const foros_1 = require("../controllers/foros");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/:id", session_1.checkJwt, foros_1.GetForo);
router.get("/foros-curso/:id", session_1.checkJwt, foros_1.GetForosCurso);
router.post("/crear-foro/", session_1.checkJwt, foros_1.CreateForo);
router.put("/editar-foro/:id", session_1.checkJwt, foros_1.UpdateForo);
router.delete("/del-foro/:id", session_1.checkJwt, foros_1.DelForo);
