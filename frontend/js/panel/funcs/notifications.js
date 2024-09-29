import { getToken } from "../../funcs/utils.js";

const insertNotificationBody = (notifications) => {
  const notificationModalListEl = document.querySelector(
    ".home-notification-modal-list"
  );

  if (notifications.length) {
    notifications.forEach((notification) => {
      notificationModalListEl.insertAdjacentHTML(
        "beforeend",
        `
          <li class="home-notification-modal-item">
            <span class="home-notification-modal-text">${notification.msg}</span>
              <a onclick="notificationSeen('${notification._id}')">دیدم</a>
          </li>
          `
      );
    });
  } else {
    notificationModalListEl.insertAdjacentHTML(
      "beforeend",
      `
           <li class="slert alert-danger text-center">
           
              شما هیچ اعلانیه ای  ندارید
          </li>
        `
    );
  }
};

const notificationSeen = async (notificationID) => {
  const res = await fetch(
    `http://127.0.0.1:4000/va/notifications/see/${notificationID}`,
    {
      methoed: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const result = await res.json();
};

export { insertNotificationBody, notificationSeen };
