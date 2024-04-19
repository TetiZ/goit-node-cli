import contactsFunc from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsFunc.listContacts();
      return contacts;

    case "get":
      const contact = await contactsFunc.getContactById(id);
      return contact;

    case "add":
      const newContact = await contactsFunc.addContact(name, email, phone);
      return newContact;

    case "remove":
      const removeContact = await contactsFunc.removeContact(id);
      return removeContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options).then(console.log).catch(console.error);
