import {
  showAllUsers,
  removeUser,
  banUser,
  createNewUser,
  changeRole,
} from "./funcs/users.js";

window.removeUser = removeUser;
window.banUser = banUser;
window.changeRole = changeRole;

window.addEventListener("load", () => {
  const createNewUserBtn = document.querySelector("#create-new-user");

  showAllUsers();
  createNewUserBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createNewUser();
  });
});
