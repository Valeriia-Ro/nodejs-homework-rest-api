const shortid = require("shortid");

const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const addInMOdel = async (data) => {
  const contacts = await listContacts();
  const newContact = { ...data, id: shortid.generate() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = addInMOdel;
