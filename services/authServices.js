import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

export const findUser = (query) =>
  User.findOne({
    where: query,
  });
export const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) {
    return null;
  }
  return user.update(data, {
    returning: true,
  });
};

export const signup = async (data) => {
  try {
    const { password, email } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    const poster = gravatar.url(email);
    const newUser = await User.create({
      ...data,
      password: hashPassword,
      avatarURL: poster,
    });
    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email in use";
    }
    throw error;
  }
};
