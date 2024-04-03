"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const session_1 = require("../middleware/session");
const express_1 = require("express");
const upload = require('../middleware/uploadFile');
const router = (0, express_1.Router)();
exports.router = router;
router.post("/:nombre", session_1.checkJwt, upload, (req, res) => {
    const file = req.file;
    console.log(req.file);
    res.json("Se subió el archivo");
    console.log("Pase en las rutas");
});
