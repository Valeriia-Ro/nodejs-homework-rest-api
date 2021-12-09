const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const updateContactById = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => String(contact.id) === id);
  if (idx === -1) {
    return null;
  }
  const updatedContacts = { ...contacts[idx], ...body };
  contacts[idx] = updatedContacts;
  await updateContacts(contacts);
  return updatedContacts;
};

module.exports = updateContactById;
