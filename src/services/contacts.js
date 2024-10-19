import { SORT_ORDER } from '../constants/contacts.js';
import { ContactsCollection } from '../db/models/contact.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.isFavourite !== undefined) {
    console.log('worked', filter.isFavourite);
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  const contactsCount = await ContactsCollection.countDocuments(contactsQuery);

  const total = Math.ceil(contactsCount / perPage);

  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  return {
    data,
    page,
    perPage,
    totalItems: contactsCount,
    totalPages: total,
    hasPreviousPage: page > 1,
    hasNextPage: Boolean(total - page),
  };
}

export async function getContactById(contactId) {
  const contact = await ContactsCollection.findById(contactId);

  return contact;
}

export async function createContact(newContact) {
  const contact = await ContactsCollection.create(newContact);
  return contact;
}

export async function updateContact(contactId, contact) {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    contact,
    { new: true },
  );
  return updatedContact;
}

export async function deleteContact(contactId) {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
}
