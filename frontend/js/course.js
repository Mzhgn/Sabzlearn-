import { getCourseDetails, getRelatedCourses } from "./funcs/shared.js";

window.addEventListener("load", () => {
  getCourseDetails();
  getRelatedCourses().then((data) => {
    console.log(data);
  });
});
