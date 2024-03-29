"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const rutasAcceso_1 = require("../controllers/rutasAcceso");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/:id", session_1.checkJwt, rutasAcceso_1.getRutas);
