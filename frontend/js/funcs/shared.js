import { getMe } from "./auth.js";
import { isLogin, getUrlParam } from "./utils.js";

const showUserNameNavbar = () => {
  const navbarNameBox = document.querySelector(".main-header__profile");

  const isUserLogin = isLogin();
  if (isUserLogin) {
    const userInfo = getMe().then((data) => {
      navbarNameBox.setAttribute("href", "index.html");
      navbarNameBox.innerHTML = ` <span class="main-header__profile-text">${data.name}</span>`;
    });
  } else {
    navbarNameBox.setAttribute("href", "login.html");
    navbarNameBox.innerHTML =
      '<span class="main-header__profile-text">ثبت نام /ورود</span>';
  }
};

const renderTopbarMenu = async () => {
  const topbarMenuLists = document.querySelector(".top-bar__menu");

  const res = await fetch(`http://127.0.0.1:4000/v1/menus/topbar`);
  const topbarMenus = await res.json();

  topbarMenuLists.innerHTML = " ";

  const shuffledArray = topbarMenus.sort((a, b) => 0.5 - Math.random());

  topbarMenus.slice(0, 6).map((menu) => {
    topbarMenuLists.innerHTML += `<li class="top-bar__item">
                  <a href="" class="top-bar__link">${menu.title} </a></li>`;
  });
};

const getAllCourses = async () => {
  const coursesContainer = document.querySelector("#courses-container");

  const res = await fetch(`http://127.0.0.1:4000/v1/courses`);
  const courses = await res.json();

  courses.slice(0, 6).map((course) => {
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      ` <div class="col-4">
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
                          > ${course.creator}</a
                        >
                      </div>
                      <div class="courses-box__rating"> ${Array(
                        5 - course.courseAverageScore
                      )
                        .fill(0)
                        .map(
                          (score) =>
                            '<img src="images/svgs/star.svg" alt="rating iamge" class="course-box__star"/>'
                        )
                        .join(" ")}  ${Array(course.courseAverageScore)
        .fill(0)
        .map(
          (score) =>
            '<img src="images/svgs/star_fill.svg" alt="rating iamge" class="course-box__star"/>'
        )
        .join(" ")} 
                        
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users"></i>
                        <span class="course-box__users-text">${
                          course.registers
                        }</span>
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

  return courses;
};

const getPopularCourses = async () => {
  const popularCourseWrapper = document.querySelector(
    "#popular-courses-wrapper"
  );
  const res = await fetch(`http://127.0.0.1:4000/v1/courses/popular`);
  const popularCourses = await res.json();

  popularCourses.forEach((course) => {
    popularCourseWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="swiper-slide">
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
                          > ${course.creator}</a
                        >
                      </div>
                      <div class="courses-box__rating">
                        <img
                          src="images/svgs/star.svg"
                          alt="rating iamge"
                          class="course-box__star"
                        />
                        <img
                          src="images/svgs/star_fill.svg"
                          alt="rating iamge"
                          class="course-box__star"
                        />
                        <img
                          src="images/svgs/star_fill.svg"
                          alt="rating iamge"
                          class="course-box__star"
                        />
                        <img
                          src="images/svgs/star_fill.svg"
                          alt="rating iamge"
                          class="course-box__star"
                        />
                        <img
                          src="images/svgs/star_fill.svg"
                          alt="rating iamge"
                          class="course-box__star"
                        />
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users"></i>
                        <span class="course-box__users-text">${
                          course.registers
                        }</span>
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

  return popularCourses;
};

const getPresellCourses = async () => {
  const presellCoursesWrapper = document.querySelector(
    "#presell-courses-wrapper"
  );

  const res = await fetch(`http://127.0.0.1:4000/v1/courses/presell`);
  const presellCourses = await res.json();

  presellCourses.forEach((course) => {
    presellCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <div class="swiper-slide">
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
                          >${course.creator} </a
                        >
                      </div>
                      <div class="courses-box__rating">
                      ${Array(5 - course.courseAverageScore)
                        .fill(0)
                        .map(
                          (score) =>
                            '<img src="images/svgs/star.svg" alt="rating iamge" class="course-box__star"/>'
                        )
                        .join(" ")}  ${Array(course.courseAverageScore)
        .fill(0)
        .map(
          (score) =>
            '<img src="images/svgs/star_fill.svg" alt="rating iamge" class="course-box__star"/>'
        )
        .join(" ")}
                        
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users"></i>
                        <span class="course-box__users-text">${
                          course.registers
                        }</span>
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
              </div>
      `
    );
  });

  return presellCourses;
};

const getAllArticles = async () => {
  const aricleWrapper = document.querySelector("#articles-wrapper");

  const res = await fetch(`http://127.0.0.1:4000/v1/articles`);
  const articles = await res.json();

  articles.slice(0, 6).forEach((article) => {
    aricleWrapper.insertAdjacentHTML(
      "beforeend",
      `  <div class="col-4">
              <div class="article-card">
                <div class="article-card__header">
                  <a href="#" class="article-card__link-img">
                    <img
                      src=http://127.0.0.1:4000/courses/covers/${article.cover}
                      alt="Article Cover"
                      class="article-card__img"
                    />
                  </a>
                </div>
                <div class="article-card__content">
                  <a href="#" class="article-card__link"
                    >${article.title}</a
                  >
                  <p class="article-card__text">
                    ${article.description}
                  </p>
                  <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>`
    );
  });

  return articles;
};

const getNavbarMeues = async () => {
  const menusWrapper = document.querySelector("#menus-wrapper");
  const res = await fetch(`http://127.0.0.1:4000/v1/menus`);
  const navbarMenus = await res.json();

  navbarMenus.forEach((menu) => {
    menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <li class="main-header__item">
                <a href=category.html?cat=${menu.href} class="main-header__link"
                  >${menu.title} ${
        menu.submenus.length !== 0
          ? `<i class="fas fa-angle-down main-header__link-icon"></i>
                  <ul class="main-header__dropdown"> ${menu.submenus
                    .map(
                      (submenu) =>
                        `<li class="main-header__dropdown-item">
                        <a href="#" class="main-header__dropdown-link">
                          ${submenu.title}
                        </a>
                      </li>`
                    )
                    .join(" ")}
                  </ul>`
          : ""
      }
                  </a>
              </li>`
    );
  });

  return navbarMenus;
};

const getCategoryCourses = async () => {
  const categoryName = getUrlParam("cat");
  const modifiedCategoryName = categoryName.replace("/category-info/", "");

  const res = await fetch(
    `http://127.0.0.1:4000/v1/courses/category/${modifiedCategoryName}`
  );
  const courses = await res.json();

  console.log(courses);

  return courses;
};

export {
  showUserNameNavbar,
  renderTopbarMenu,
  getAllCourses,
  getPopularCourses,
  getPresellCourses,
  getAllArticles,
  getNavbarMeues,
  getCategoryCourses,
};
