import { getCategoryCourses } from "./funcs/shared.js";

window.addEventListener("load", () => {
  getCategoryCourses().then((responseCourses) => {
    const categoryWrapper = document.querySelector("#category-wrapper");
    let courses = [...responseCourses];
    let coursesShowType = "row";
    const coursesShowTypeIcons = document.querySelectorAll(
      ".courses-top-bar__icon-parent"
    );

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
          categoryWrapper.innerHTML = "";

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
          categoryWrapper.innerHTML = "";
          courses.forEach((course) => {
            categoryWrapper.insertAdjacentHTML(
              "beforeend",
              `
      <div class="col-12">
      <div class="course-box">
          <div class="course__box-header">
              <div class="course__box-right">
                  <a class="course__box-right-link" href="#">
                      <img src=http://localhost:4000/courses/covers/${
                        course.cover
                      } class="course__box-right-img">
                  </a>
              </div>
              <div class="course__box-left">
                  <div class="course__box-left-top">
                      <a href="#" class="course__box-left-link">${
                        course.name
                      }</a>
                  </div>
                  <div class="course__box-left-center">
                      <div class="course__box-left-teacher">
                          <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                          <span class="course__box-left-name">
                            رضا دولتی
                          </span>
                      </div>
                      <div class="course__box-left-stars">
                        <img src="images/svgs/star.svg" alt="rating" class="course-box__star">
                              <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                          
                              <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                          
                              <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                          
                              <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                          
                         
                      </div>
                  </div>
                  <div class="course__box-left-bottom">
                      <div class="course__box-left-des">
                          <p>امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری
                              که
                              حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده
                              سازی
                              نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس
                              شما هم
                              اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های
                              کاربردی
                              که در بازار کار استفاده می شوند را به خوبی بلد باشید</p>
                      </div>
                  </div>
                  <div class="course__box-footer">
                      <div class="course__box-footer-right">
                          <i class="course__box-footer-icon fa fa-users"></i>
                          <span class="course__box-footer-count">${500}</span>
                      </div>
                      <span class="course__box-footer-left">${
                        course.price === 0
                          ? "رایگان"
                          : course.price.toLocaleString()
                      }</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `
            );
          });
        }
      });
    });
  });
});
