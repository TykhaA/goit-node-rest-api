import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorator/controllerWrapper.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const result = await contactsService.getAllContacts(
    { owner },
    { page, limit }
  );
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.getContact(id, owner);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.deleteContact({ id, owner });

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  } else {
    res.json({
      message: "Contact delete succesfuly",
    });
  }
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsService.createContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const updatedData = req.body;

  if (!Object.keys(req.body).length) {
    throw HttpError(400, `There is no parameters`);
  }
  const result = await contactsService.updateContact(
    { id, owner },
    updatedData
  );

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json(result);
};
const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { id: owner } = req.user;
  if (typeof { favorite } !== "boolean") {
    throw HttpError(400, "Favorite field must be a boolean");
  }
  try {
    const updateContact = await contactsService.updateContact(
      { id, owner },
      { favorite }
    );
    if (!updateContact) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.status(200).json(updateContact);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  createContact: ctrlWrapper(createContact),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
