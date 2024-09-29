import { showWholeCourses, inserCategoryHtmlTemplate } from "./funcs/shared.js";
import { paginatedItems, getUrlParam, addParamToUrl } from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl;

window.addEventListener("load", () => {
  showWholeCourses().then((courses) => {
    console.log(courses);
    const coursesWrapperEl = document.querySelector("#courses-wrapper");
    const coursesPaginationWrapper = document.querySelector(
      "#courses-pagination"
    );
    const currentPage = getUrlParam("page");
    console.log(currentPage);

    let shownCourses = paginatedItems(
      [...courses],
      3,
      coursesPaginationWrapper,
      currentPage
    );
    inserCategoryHtmlTemplate([...shownCourses], "row", coursesWrapperEl);
  });
});
