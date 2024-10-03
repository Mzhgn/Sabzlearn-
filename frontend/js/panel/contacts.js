import {
  showAllContacts,
  showContactBody,
  answerToContact,
} from "./funcs/contacts.js";

window.showContactBody = showContactBody;

window.addEventListener("load", () => {
  showAllContacts();
});
