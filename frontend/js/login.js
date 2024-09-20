import { login } from "./funcs/auth.js";

console.log("hi");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  login();
});
