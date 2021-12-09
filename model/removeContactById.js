const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function removeContactById(id) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id.toString() === id);
    if (idx === -1) {
      return null;
    }
    contacts.splice(idx, 1);
    await updateContacts(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

module.exports = removeContactById;
