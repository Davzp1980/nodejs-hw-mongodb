import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export async function checkIsYourContact(req, res, next) {
  const userId = req.user._id.toString();

  const { contactId } = req.params;

  const contact = await ContactsCollection.findById(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  if (!contact.userId) {
    next(createHttpError(403, 'Forbidden'));
    return;
  }

  if (contact.userId.toString() === userId) {
    next();
    return;
  }

  next(createHttpError(403, 'Forbidden'));
}
