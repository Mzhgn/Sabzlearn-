import { getMe } from "./funcs/auth.js";
import {
  showUserNameNavbar,
  renderTopbarMenu,
  createNewsletter,
} from "./funcs/shared.js";

window.addEventListener("load", () => {
  showUserNameNavbar();
  renderTopbarMenu();
  //  newsletter
  const newsLetterBtn = document.querySelector("#news-letter-submit-btn");
  newsLetterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createNewsletter();
  });
});
