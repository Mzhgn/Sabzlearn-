import { showWholeCourses, inserCategoryHtmlTemplate } from "./funcs/shared.js";
import { paginatedItems, getUrlParam, addParamToUrl } from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl;

window.addEventListener("DOMContentLoaded", () => {
  showWholeCourses().then((courses) => {
    console.log("the log of courses", courses);
    const coursesWrapperEl = document.querySelector("#courses-wrapper");
    const coursesPaginationWrapper = document.querySelector(
      "#courses-pagination"
    );
    const currentPage = getUrlParam("page");
    console.log("the result of logging getUrlParam('page')", currentPage);

    let shownCourses = paginatedItems(
      [...courses],
      3,
      coursesPaginationWrapper,
      currentPage
    );
    console.log("log of shownCourses", shownCourses);
    inserCategoryHtmlTemplate([...shownCourses], "row", coursesWrapperEl);
  });
});
