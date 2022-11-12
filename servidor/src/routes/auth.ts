import { Request,Response, Router } from "express";
import {loginController} from "../controllers/auth"

const router=Router();

router.post("/login",loginController);

export {router}