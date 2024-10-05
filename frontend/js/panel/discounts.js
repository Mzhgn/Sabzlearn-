import {
  createDiscountCode,
  showAllDiscountsCodes,
  prepareCreateNewDiscountCodeForm,
  removeDiscount,
} from "./funcs/discounts.js";

window.removeDiscount = removeDiscount;

window.addEventListener("load", () => {
  const createDiscountBtnEl = document.querySelector("#create-discount");

  showAllDiscountsCodes();
  prepareCreateNewDiscountCodeForm();

  createDiscountBtnEl.addEventListener("click", (event) => {
    event.preventDefault();
    createDiscountCode();
  });
});
