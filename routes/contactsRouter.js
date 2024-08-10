import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
const addContactMiddleware = validateBody(createContactSchema);
const updateContactMiddleware = validateBody(updateContactSchema);
const updateFavoriteMiddleware = validateBody(updateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  addContactMiddleware,
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  updateContactMiddleware,
  contactsControllers.updateContact
);
contactsRouter.patch(
  "/:contactId/favorite",
  updateFavoriteMiddleware,
  contactsControllers.updateStatusContact
);

export default contactsRouter;
