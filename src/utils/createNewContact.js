const { nanoid } = require("nanoid");

const createNewContact = (data, id) => ({ id: nanoid(), ...data });

module.exports = createNewContact;
