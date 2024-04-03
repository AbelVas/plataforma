"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const session_1 = require("../middleware/session");
const adminOpcionesMenu_1 = require("../controllers/adminOpcionesMenu");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', session_1.checkJwt, adminOpcionesMenu_1.getSideBarOpcionAdmin);
