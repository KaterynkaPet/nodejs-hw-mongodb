import { Router } from "express";
import * as contactConrollers from "../controllers/contacts.js";

import authenticate from "../middlewares/authenticate.js";
import isValidId from "../middlewares/isValidId.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { contactAddSchema, contactPatchSchema } from "../validation/contacts.js";

import upload  from "../middlewares/upload.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/",ctrlWrapper(contactConrollers.getAllContactsController));

contactsRouter.get("/:id", isValidId, ctrlWrapper(contactConrollers.getAllContactByIdController));

contactsRouter.post("/", upload.single("photo"), validateBody(contactAddSchema), ctrlWrapper(contactConrollers.addContactController));

contactsRouter.put("/:id", isValidId, validateBody(contactAddSchema), ctrlWrapper(contactConrollers.upsertContactController));

contactsRouter.patch("/:id", upload.single("photo"), isValidId, validateBody(contactPatchSchema), ctrlWrapper(contactConrollers.patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(contactConrollers.deleteContactController));

export default contactsRouter;
