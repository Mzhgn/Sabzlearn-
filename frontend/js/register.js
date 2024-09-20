import { register } from "./funcs/auth.js";

const registerBtnE = document.querySelector("#register-btn");

console.log("hi");

registerBtnE.addEventListener("click", (e) => {
  e.preventDefault();
  register();
});
