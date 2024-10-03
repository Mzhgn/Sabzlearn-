import {
  showAllCategories,
  removeCategory,
  createNewCategory,
} from "./funcs/categories.js";
window.removeCategory = removeCategory;

window.addEventListener("load", () => {
  const createNewCategoryBtn = document.querySelector("#create-category");
  showAllCategories();

  createNewCategoryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createNewCategory();
  });
});
