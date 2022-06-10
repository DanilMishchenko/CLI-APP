const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

const { v4 } = require("uuid");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const result = contacts.find((contact) => contact.id == contactId);

      if (!result) {
        return null;
      }

      return console.table(result);
    })
    .catch((error) => console.log(error));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const result = contacts.find((contact) => contact.id === contactId);

      if (!result) {
        console.log("Sorry we cant find this contact");
        return;
      }

      const newContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(newContacts));
      return console.log(`Contact ${result.name} deleted`);
    })
    .catch((error) => console.log(error));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = { id: v4(), name, email, phone };
      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts));
      return console.log(`Contact ${name} added`);
    })
    .catch((error) => console.log(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
