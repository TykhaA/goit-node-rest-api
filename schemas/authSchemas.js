import Joi from "joi";
import { emailRegexp } from "../constants/authConstants.js";

const authSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().optional(),
});
export const authEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export default authSignupSchema;
