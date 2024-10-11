import {
  getCategoryCourses,
  inserCategoryHtmlTemplate,
  coursesSorting,
} from "./funcs/shared.js";
import {
  searchInArray,
  paginatedItems,
  getUrlParam,
  addParamToUrl,
} from "./funcs/utils.js";
window.addParamToUrl = addParamToUrl;

window.addEventListener("load", () => {
  getCategoryCourses().then((responseCourses) => {
    const categoryWrapper = document.querySelector("#category-wrapper");
    let courses = [...responseCourses];
    let coursesShowType = "row";
    const coursesShowTypeIcons = document.querySelectorAll(
      ".courses-top-bar__icon-parent"
    );
    const courseFilteringSelections = document.querySelectorAll(
      ".courses-top-bar__selection-item"
    );
    const selectionTitleElem = document.querySelector(
      ".courses-top-bar__selection-title"
    );
    const courseSearchInput = document.querySelector(".courses-top-bar__input");
    // show category courses row/column

    console.log("Courses ->", courses);

    if (courses.length) {
      inserCategoryHtmlTemplate(courses, coursesShowType, categoryWrapper);
    } else {
      console.log("No Courses");
      console.log("categoryWrapper ->", categoryWrapper);

      // console.log(courses.length);
      // console.log(typeof courses.length);
      // console.log(categoryWrapper.innerHTML);
      categoryWrapper.insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-danger">هیچ دوره‌ای برای این دسته بندی وجود ندارد </div> `
      );
    }

    coursesShowTypeIcons.forEach((coursesShowTypeIcon) => {
      coursesShowTypeIcon.addEventListener("click", (event) => {
        console.log(event.currentTarget);
        // event.stopPropagation();

        coursesShowTypeIcons.forEach((icon) =>
          icon.classList.remove("courses-top-bar__icon--active")
        );
        event.currentTarget.classList.add("courses-top-bar__icon--active");

        console.log(String(event.target.className).includes("row"));

        if (String(event.target.className).includes("row")) {
          coursesShowType = "row";
          inserCategoryHtmlTemplate(courses, coursesShowType, categoryWrapper);
        } else {
          coursesShowType = "column";
          inserCategoryHtmlTemplate(courses, coursesShowType, categoryWrapper);
        }
      });
    });

    // show courses by user Selection.
    courseFilteringSelections.forEach((selection) => {
      selection.addEventListener("click", (event) => {
        courseFilteringSelections.forEach((selection) => {
          selection.addEventListener("mouseover", (event) => {
            courseFilteringSelections.forEach((selected) => {
              selected.classList.remove(
                "courses-top-bar__selection-item--active"
              );
            });
            event.target.classList.add(
              "courses-top-bar__selection-item--active"
            );
          });
        });

        courseFilteringSelections.forEach((selected) => {
          selected.classList.remove("courses-top-bar__selection-item--active");
        });
        event.target.classList.add("courses-top-bar__selection-item--active");
        selectionTitleElem.innerHTML = "";

        selectionTitleElem.insertAdjacentHTML(
          "beforeend",
          `${event.target.innerHTML}<i class="fas fa-angle-down courses-top-bar__selection-icon">`
        );

        let sortingSelection = event.target.dataset.key;
        let shownCourses = coursesSorting([...courses], sortingSelection);
        inserCategoryHtmlTemplate(
          shownCourses,
          coursesShowType,
          categoryWrapper
        );
      });
    });

    // handle search input of courses
    courseSearchInput.addEventListener("input", (event) => {
      const shownCourses = searchInArray(
        [...responseCourses],
        "name",
        event.target.value
      );
      if (shownCourses.length) {
        inserCategoryHtmlTemplate(
          shownCourses,
          coursesShowType,
          categoryWrapper
        );
      } else {
        categoryWrapper.innerHTML = "";
        categoryWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger">دوره ای برای این جستجو یافت نشد</div>`
        );
      }
    });

    // Handle Pagination
    const paginationWrapper = document.querySelector(
      ".courses__pagination-list"
    );
    const currentPage = getUrlParam("page");
    const showPaginatedCourses = paginatedItems(
      [...responseCourses],
      3,
      paginationWrapper,
      currentPage
    );
    inserCategoryHtmlTemplate(
      [...showPaginatedCourses],
      coursesShowType,
      categoryWrapper
    );
  });
});
