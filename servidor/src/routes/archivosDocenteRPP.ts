import { Router } from "express";

import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/renas/:id");
router.post("/renas/:id")
router.delete("/renas/:id");


export{router};