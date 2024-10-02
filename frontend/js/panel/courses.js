import {
  getAllCourses,
  createNewCourse,
  prepareCreateCourseForm,
  removeCourse,
} from "./funcs/courses.js";

window.removeCourse = removeCourse;

window.addEventListener("load", () => {
  getAllCourses();
  prepareCreateCourseForm();

  const createCourseBtn = document.querySelector("#create-course-btn");

  createCourseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createNewCourse();
  });
});
