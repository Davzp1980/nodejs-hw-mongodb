import { Router } from 'express';
import express from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkIsYourContact } from '../middlewares/checkIsYourContact.js';

const contactsRouter = Router();

const jsonParser = express.json();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/:contactId',

  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',

  jsonParser,
  isValidId,

  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  checkIsYourContact,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
