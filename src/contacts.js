import { nanoid } from "nanoid";
import fs from "node:fs/promises";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);
    return contacts;
  } catch (e) {
    throw e;
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    return foundContact || null;
  } catch (e) {
    throw e;
  }
}

export async function removeContact(contactId) {
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

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (e) {
    throw e;
  }
}

const result = await addContact("a", "b", "c");
console.log(result);
