import dbContacts from "../db/models/dbContacts.js";

export const getAllContacts = async (query = {}, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;
  return dbContacts.findAll({
    where: query,
    limit: normalizedLimit,
    offset,
  });
};

export const getContact = async (query) =>
  dbContacts.findOne({
    where: query,
  });

export const deleteContact = async (query) =>
  dbContacts.destroy({
    where: query,
  });

export const createContact = async (data) => dbContacts.create(data);

export const updateContact = async (query, data) => {
  const contact = await getContact(query);
  const { id } = query;
  if (!contact) {
    return null;
  }

  return dbContacts.update(data, {
    where: {
      id,
    },
  });
};
