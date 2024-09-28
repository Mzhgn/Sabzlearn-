import {
  getCourseDetails,
  getRelatedCourses,
  recordComments,
} from "./funcs/shared.js";

window.addEventListener("load", () => {
  const submitCommentBtn = document.querySelector(".comments__respond-btn");

  getCourseDetails();
  getRelatedCourses();

  submitCommentBtn.addEventListener("click", () => {
    recordComments();
  });
});
