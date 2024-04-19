import crypto from "node:crypto";
import * as fs from "node:fs/promises";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);
    return contacts;
  } catch (e) {
    throw e;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    if (typeof foundContact === undefined) {
      return null;
    }
    return foundContact;
  } catch (e) {
    throw e;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToRemove = await getContactById(contactId);

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    return filteredContacts.length < contacts.length ? contactToRemove : null;
  } catch (e) {
    throw e;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
    return newContact;
  } catch (e) {
    throw e;
  }
}

export default { listContacts, getContactById, removeContact, addContact };
