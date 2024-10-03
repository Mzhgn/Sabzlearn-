import {
  showAllContacts,
  showContactBody,
  answerToContact,
  removeContact,
} from "./funcs/contacts.js";

window.showContactBody = showContactBody;
window.answerToContact = answerToContact;
window.removeContact = removeContact;

window.addEventListener("load", () => {
  showAllContacts();
});
