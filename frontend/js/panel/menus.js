import {
  showAllMenus,
  prepareCreateMenuForm,
  createNewMenu,
  removeMenu,
} from "./funcs/menus.js";

window.removeMenu = removeMenu;

window.addEventListener("load", () => {
  const createMenuBtn = document.querySelector("#createmenu-btn");
  prepareCreateMenuForm();
  showAllMenus();

  createMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createNewMenu();
  });
});
