import { getAdminInfo } from "./funcs/utils.js";
const $ = document;

window.addEventListener("load", () => {
  const adminWelcomeNameEl = $.querySelector("#admin-welcome-name");
  const adminNameEl = $.querySelector("#admin-name");
  getAdminInfo().then((data) => {
    // protect Cms route
    if (adminNameEl.role === "ADMIN") {
      // show admin name on page
      console.log(data);
      adminNameEl.innerHTML = data.name;
      adminWelcomeNameEl.innerHTML = data.name;
    } else {
      location.replace("../../login.html");
    }
  });
});
