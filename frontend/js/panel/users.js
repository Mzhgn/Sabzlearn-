import { showAllUsers, removeUser, banUser } from "./funcs/users.js";

window.removeUser = removeUser;
window.banUser = banUser;

window.addEventListener("load", () => {
  showAllUsers();
});
