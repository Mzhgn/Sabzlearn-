import { getMe } from "./funcs/auth.js";
import { showUserNameNavbar, renderTopbarMenu } from "./funcs/shared.js";

window.addEventListener("load", () => {
  showUserNameNavbar();
  renderTopbarMenu();
});
