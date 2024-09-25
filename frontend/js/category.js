import { getCategoryCourses } from "./funcs/shared.js";

window.addEventListener("load", () => {
  getCategoryCourses().then((data) => {
    console.log(data);
  });
});
