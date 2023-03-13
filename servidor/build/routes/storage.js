"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const handleStorage_1 = require("../utils/handleStorage");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/:nombre", session_1.checkJwt, handleStorage_1.uploadMiddleware.single("myfile"), (req, res) => {
    res.json("Se subió el archivo");
});
