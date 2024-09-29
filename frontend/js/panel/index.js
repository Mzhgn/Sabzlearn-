import { getAdminInfo } from "./funcs/utils.js";
import {
  insertNotificationBody,
  notificationSeen,
} from "./funcs/notifications.js";

window.notificationSeen = notificationSeen;

window.addEventListener("load", () => {
  const adminNameEl = document.querySelector("#admin-name");
  const notificationEl = document.querySelector("#notifications-icon");
  const notificationModalEl = document.querySelector(
    ".home-notification-modal"
  );
  getAdminInfo().then((data) => {
    // protect Cms route
    if (data.role === "ADMIN") {
      // show admin name on page
      console.log(data);
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
      console.log("hi");
    });

    insertNotificationBody(data.notifications);
  });
});
