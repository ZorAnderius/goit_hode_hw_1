const contactsRepository = require("../contacts");
const getArgumData = require("../utils/getArgumData");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsRepository.listContacts();
      console.log("Successfully found all contacts:");
      console.table(contacts);
      break;

    case "get":
      const contactGet = await contactsRepository.getContactById(id);
      console.log(`Successfully found a contact with id ${id}:`, contactGet);
      break;

    case "add":
      const contactAdd = await contactsRepository.addContact({
        name,
        email,
        phone,
      });
      console.log("Successfully added a contact", contactAdd);
      break;

    case "remove":
      const contact = await contactsRepository.removeContact(id);
      if (contact) {
        console.log(`Successfully remove contact with id ${id}`, contact);
      } else {
        console.log(`Contact with id ${id} is not found`);
      }
      break;

    case "update":
      const data = getArgumData({
        name,
        email,
        phone,
      });
      const contactUpdate = await contactsRepository.updateContact(id, data);
      if (contactUpdate) {
        console.log(`Successfully update contact with id ${id}`, contactUpdate);
      } else {
        console.log(`Contact with id ${id} is not found`);
      }
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

module.exports = invokeAction;
