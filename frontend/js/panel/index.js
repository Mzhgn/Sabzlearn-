import { getAdminInfo, logout } from "./funcs/utils.js";
import {
  insertNotificationBody,
  notificationSeen,
} from "./funcs/notifications.js";
import { showSwal } from "../funcs/utils.js";

window.notificationSeen = notificationSeen;

window.addEventListener("load", () => {
  const adminNameEl = document.querySelector("#admin-name");
  const adminWelcomeNameEl = document.querySelector("#admin-welcome-name");

  const notificationEl = document.querySelector("#notifications-icon");
  const notificationModalEl = document.querySelector(
    ".home-notification-modal"
  );
  const logoutBtnElem = document.querySelector("#logout-btn");

  getAdminInfo().then((data) => {
    // protect Cms route
    if (data.role === "ADMIN") {
      // show admin name on page
      adminNameEl.innerHTML = data.name;
      adminWelcomeNameEl.innerHTML = data.name;
    } else {
      location.replace("../../login.html");
    }

    notificationEl.addEventListener("mouseenter", () => {
      notificationModalEl.classList.add("active-modal-notfication");
      console.log("hi");
    });

    notificationModalEl.addEventListener("mouseleave", () => {
      notificationModalEl.classList.remove("active-modal-notfication");
    });

    insertNotificationBody(data.notifications);
  });

  logoutBtnElem.addEventListener("click", (event) => {
    event.preventDefault();

    showSwal(
      "آیا از Logout اطمینان دارید؟",
      "success",
      ["خیر", "بله"],
      (result) => {
        if (result) {
          showSwal("با موفقیت خارج شدید", "success", "صفحه اصلی سایت", () => {
            logout();
            location.href = "../../index.html";
          });
        }
      }
    );
  });
});
