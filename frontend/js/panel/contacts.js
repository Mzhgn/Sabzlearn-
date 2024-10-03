import { showAllContacts, showContactBody } from "./funcs/contacts.js";

window.showContactBody = showContactBody;

window.addEventListener("load", () => {
  showAllContacts();
});
