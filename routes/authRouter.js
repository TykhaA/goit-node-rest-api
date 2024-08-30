import { Router } from "express";

import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorator/validateBody.js";
import authSignupSchema, { authEmailSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const signupMiddleware = validateBody(authSignupSchema);
const verifyEmailMiddleware = validateBody(authEmailSchema);
const authRouter = Router();

authRouter.get("/verify/:verificationCode", authControllers.verify);
authRouter.post("/verify", verifyEmailMiddleware, authControllers.resendVerify);

authRouter.post("/signup", signupMiddleware, authControllers.signup);
authRouter.post("/signin", signupMiddleware, authControllers.signin);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authControllers.setAvatar
);

export default authRouter;
