import * as authServices from "../services/authServices.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorator/controllerWrapper.js";
import jwt from "jsonwebtoken";
import { getAllContacts, getContact } from "../services/contactsServices.js";
import fs from "fs/promises";
import path from "path";

const avatarsPath = path.resolve("public", "avatars");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
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
  res.json({
    token,
    user: { email, subscription: user.subscription },
  });
};

const setAvatar = async (
  { user: { id }, file: { path: oldPath, filename } },
  res
) => {
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  const data = {
    avatarURL,
  };
  const query = { id };
  const updatedUser = await authServices.updateUser(query, data);

  res.json({ avatarURL: updatedUser.avatarURL });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: "" });
  res.status(204).end();
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  setAvatar: ctrlWrapper(setAvatar),
  logout,
};
