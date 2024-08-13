import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorator/controllerWrapper.js";

const getAllContacts = async (req, res) => {
  const result = await contactsService.getAllContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getOneContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.deleteContact(id);

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  } else {
    res.json({
      message: "Contact delete succesfuly",
    });
  }
};

const createContact = async (req, res) => {
  const result = await contactsService.createContact(req.body);
  res.status(201).json(result);
};

const updateContact = async ({ params: { id }, body }, res) => {
  if (!Object.keys(body).length) {
    throw HttpError(400, `There is no parameters`);
  }
  const result = await contactsService.updateContact(id, body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json(result);
};
const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = req.body;
  if (typeof data.favorite !== "boolean") {
    throw HttpError(400, "Favorite field must be a boolean");
  }
  try {
    const updateContact = await contactsService.updateContact(contactId, data);
    console.log(updateContact);
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
