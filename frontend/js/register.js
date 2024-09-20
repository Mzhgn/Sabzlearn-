import { register } from "./funcs/auth.js";

const registerBtnE = document.querySelector("#register-btn");

registerBtnE.addEventListener("click", (e) => {
  e.preventDefault();
  register();
});
