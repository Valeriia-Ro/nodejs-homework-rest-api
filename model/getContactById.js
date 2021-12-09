const listContacts = require("./listContacts");

async function getContactById(id) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => String(contact.id) === String(id)
    );
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getContactById;
