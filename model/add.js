const shortid = require("shortid");

const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

async function addInMOdel({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = addInMOdel;
