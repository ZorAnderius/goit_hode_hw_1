const { Command } = require("commander");
const contactsRepository = require("./contacts");
const getArgumData = require("./utils/getArgumData");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsRepository.listContacts();
      console.log("Successfully found all contacts:", contacts);
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

invokeAction(argv);

// program
//   .name("contacts_list")
//   .description("CLI to work with list of contacts")
//   .version("0.0.1");

// // TODO: get all contacts or get one contact by ID
// program
//   .command("get-contact")
//   .description("Returns a list of contacts or one contact by ID")
//   .option("--id <string>", "id of an animal we want to get")
//   .action(async ({ id }) => {
//     if (id) {
//       const contact = await contactsRepository.getContactById(id);
//       console.log(`Successfully found a contact with id ${id}:`, contact);
//     } else {
//       const contacts = await contactsRepository.listContacts();
//       console.log("Successfully found all contacts:", contacts);
//     }
//   });

// // TODO: remove contact from contact's list

// program
//   .command("remove-contact")
//   .description("Remove a contact by id")
//   .option("--id <string>", "id of contact for remove")
//   .action(async ({ id }) => {
//     const contact = await contactsRepository.removeContact(id);
//     if (contact) {
//       console.log(`Successfully remove contact with id ${id}`, contact);
//     } else {
//       console.log(`Contact with id ${id} is not found`);
//     }
//   });

// // TODO: add new contact to contaact's list

// program
//   .command("add-contact")
//   .description("Add a new contact to the contact's list")
//   .argument("<string>", "JSON with contact data")
//   .action(async (str) => {
//     const input = JSON.parse(str);
//     const contact = await contactsRepository.addContact(input);
//     console.log("Successfully added a contact", contact);
//   });

// program.parse(process.argv);
