const path = require("path");
const readFromFile = require("./utils/readFromFile");
const writeToFile = require("./utils/writeToFile");
const createNewContact = require("./utils/createNewContact");

const contactsPath = path.join(__dirname, "/db/contacts.json");

// get all contacts
const listContacts = async () => {
  const contacts = await readFromFile(contactsPath);
  return contacts;
};

//get one contact by id
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

//remove contact by id from contacts list
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await writeToFile(contactsPath, contacts);
  return result;
};

//add new contact
const addContact = async (data) => {
  const newContact = createNewContact(data);
  const contacts = await listContacts();
  contacts.push(newContact);
  await writeToFile(contactsPath, contacts);
  return newContact;
};

//update contact
const updateContact = async (contactId, data) => {
  console.log("data", data);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await writeToFile(contactsPath, contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
