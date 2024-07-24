import express from "express";
import { login, register } from "../controller/auth.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { loginUserBodySchema, registerUserBodySchema } from "../schema/auth.schema";

const router = express();

router.post("/login", validateReqBody(loginUserBodySchema), login);
router.post("/register", validateReqBody(registerUserBodySchema), register);

export default router;