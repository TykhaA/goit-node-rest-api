import fs from "node:fs/promises";

import User from "../db/models/User.js";

const updateContactData = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const getAllContacts = async () => User.findAll();

export const getOneContact = async (id) => User.findByPk(id);

export const deleteContact = async (id) =>
  User.destroy({
    where: { id },
  });

export const createContact = async (data) => User.create(data);

export const updateContact = async (id, data) => {
  const [update] = await User.update(data, {
    where: {
      id,
    },
  });
  if (update) {
    const updateContact = await User.findByPk(id);
    return updateContact;
  }
};

// export const updateStatusContact = async (id, favorite) => {
//   console.log(favorite);
//   const [update] = await User.update(favorite, {
//     where: { id },
//   });
//   if (update) {
//     const updateContact = await User.findByPk(id);
//     return updateContact;
//   }
// };
