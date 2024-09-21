import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

const showUserNameNavbar = () => {
  const navbarNameBox = document.querySelector(".main-header__profile");

  const isUserLogin = isLogin();
  if (isUserLogin) {
    const userInfo = getMe().then((data) => {
      navbarNameBox.setAttribute("href", "index.html");
      navbarNameBox.innerHTML = ` <span class="main-header__profile-text">${data.name}</span>`;
    });
  } else {
    navbarNameBox.setAttribute("href", "login.html");
    navbarNameBox.innerHTML =
      '<span class="main-header__profile-text">ثبت نام /ورود</span>';
  }
};

export { showUserNameNavbar };

// getMe().then((data) => {
//   console.log(data);
// });
