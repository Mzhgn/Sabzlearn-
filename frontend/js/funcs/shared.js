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

const renderTopbarMenu = async () => {
  const topbarMenuLists = document.querySelector(".top-bar__menu");

  const res = await fetch(`http://127.0.0.1:4000/v1/menus/topbar`);
  const topbarMenus = await res.json();

  topbarMenuLists.innerHTML = " ";

  [...topbarMenus].splice(0, 6).map((menu) => {
    topbarMenuLists.innerHTML += `<li class="top-bar__item">
                  <a href="" class="top-bar__link">${menu.title} </a></li>`;
  });
};

export { showUserNameNavbar, renderTopbarMenu };
