import { showUserInfoInEditPage, updateUser } from "./funcs/edit.js";

window.addEventListener("load", () => {
  const editInfoSubmitBtn = document.querySelector("#edit-info-btn");

  showUserInfoInEditPage();

  editInfoSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    updateUser();
  });
});
