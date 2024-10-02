import { getAdminInfo } from "./funcs/utils.js";
import {
  insertNotificationBody,
  notificationSeen,
} from "./funcs/notifications.js";

window.notificationSeen = notificationSeen;

const $ = document;

window.addEventListener("load", () => {
  const adminNameEl = $.querySelector("#admin-name");
  const notificationEl = $.querySelector("#notifications-icon");
  const notificationModalEl = $.querySelector(".home-notification-modal");

  getAdminInfo().then((data) => {
    // protect Cms route
    if (data.role === "ADMIN") {
      // show admin name on page
      adminNameEl.innerHTML = data.name;
    } else {
      location.replace("../../login.html");
    }

    notificationEl.addEventListener("mouseenter", () => {
      notificationModalEl.classList.add("active-modal-notfication");
      console.log("hi");
    });

    notificationModalEl.addEventListener("mouseleave", () => {
      notificationModalEl.classList.remove("active-modal-notfication");
      console.log("hi");
    });

    insertNotificationBody(data.notifications);
  });
});
