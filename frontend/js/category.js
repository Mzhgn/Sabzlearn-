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
    if (courses.length) {
      courses.forEach((course) => {
        categoryWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="col-4">
                  <div class="course-box">
                    <a href="#">
                      <img
                        src=http://127.0.0.1:4000/courses/covers/${course.cover}
                        alt="Course img"
                        class="course-box__img"
                      />
                    </a>
                    <div class="course-box__main">
                      <a href="#" class="course-box__title"
                        >${course.name}</a
                      >
                      <div class="course-box__rating-teacher">
                        <div class="course-box__teacher">
                          <i
                            class="fas fa-chalkboard-teacher course-box__teacher-icon"
                          ></i>
                          <a href="#" class="course-box__teacher-link"
                            >رضا دولتی</a
                          >
                        </div>
                        <div class="courses-box__rating">
                        <img src="images/svgs/star.svg" alt="rating image" class="course-box__star"/>
                        <img src="images/svgs/star_fill.svg" alt="rating image" class="course-box__star"/>
                        <img src="images/svgs/star_fill.svg" alt="rating image" class="course-box__star"/>
                        <img src="images/svgs/star_fill.svg" alt="rating image" class="course-box__star"/>
                        <img src="images/svgs/star_fill.svg" alt="rating image" class="course-box__star"/>
                        
                          
                        </div>
                      </div>
  
                      <div class="course-box__status">
                        <div class="course-box__users">
                          <i class="fas fa-users course-box__users"></i>
                          <span class="course-box__users-text">500</span>
                        </div>
                        <span class="course-box__price">${
                          course.price === 0
                            ? "رایگان"
                            : course.price.toLocaleString()
                        }</span>
                      </div>
                    </div>
  
                    <div class="course-box_foooter">
                      <a href="#" class="course-box__footer-link"
                        >مشاهده اطلاعات
                        <i class="fas fa-arrow-left course-box__footer-icon"></i
                      ></a>
                    </div>
                  </div>
                </div>`
        );
      });
    } else {
      categoryWrapper.insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-danger">دوره ای برای این دسته بندی وجود ندارد</div>`
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
    console.log();
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
