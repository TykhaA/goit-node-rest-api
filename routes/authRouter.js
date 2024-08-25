import { Router } from "express";

import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorator/validateBody.js";
import authSignupSchema from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const signupMiddleware = validateBody(authSignupSchema);
const authRouter = Router();

authRouter.post("/signup", signupMiddleware, authControllers.signup);
authRouter.post("/signin", signupMiddleware, authControllers.signin);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
