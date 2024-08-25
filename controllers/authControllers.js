import * as authServices from "../services/authServices.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorator/controllerWrapper.js";
import jwt from "jsonwebtoken";
import { getAllContacts, getContact } from "../services/contactsServices.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { id } = user;

  const contacts = await getAllContacts({ owner: id });

  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await authServices.updateUser({ id }, { token });
  res.json({ token, contacts });
};

const getCurrent = async (req, res) => {
  const { email, id } = req.user;
  const contacts = await getContact({ owner: id });
  res.json({
    email,
    contacts,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: "" });
  res.json({ message: "Logout success" });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout,
};
