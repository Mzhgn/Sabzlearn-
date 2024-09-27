import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken } from "./utils.js";

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

  console.log(courses);
  courses.slice(0, 6).map((course) => {
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      ` <div class="col-4">
                   <a href="course.html?name=${course.shortName}">
                    <img
                      src=http://127.0.0.1:4000/courses/covers/${course.cover}
                      alt="Course img"
                      class="course-box__img"
                    />
                  </a>
                  <div class="course-box__main">
                    <a href="course.html?name=${
                      course.shortName
                    }" class="course-box__title"
                      >${course.name}</a
                    >
                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i
                          class="fas fa-chalkboard-teacher course-box__teacher-icon"
                        ></i>
                        <a href="course.html?name=${
                          course.shortName
                        }" class="course-box__teacher-link"
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

const inserCategoryHtmlTemplate = (courses, showType, parentElement) => {
  parentElement.innerHTML = "";

  if (showType === "row") {
    courses.forEach((course) => {
      parentElement.insertAdjacentHTML(
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
    courses.forEach((course) => {
      parentElement.insertAdjacentHTML(
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
};
const coursesSorting = (array, filterMethod) => {
  let outputArray = [];

  switch (filterMethod) {
    case "free": {
      outputArray = array.filter((course) => course.price === 0);
      break;
    }
    case "paid": {
      outputArray = array.filter((course) => course.price !== 0);
      break;
    }
    case "oldest": {
      outputArray = [...array].reverse();
      break;
    }
    case "first": {
      outputArray = array;
      break;
    }
    case "default": {
      outputArray = array;
      break;
    }
    default: {
      outputArray = array;
      break;
    }
  }
  return outputArray;
};

const getCourseDetails = () => {
  const courseShortName = getUrlParam("name");

  // items from DOM
  const $ = document;
  const courseTiteEl = $.querySelector(".cousre-info__title");
  const courseTextEl = $.querySelector(".course-info__text");
  const courseCategoryEl = $.querySelector(".course-info__link");
  const courseRegisterStatusEl = $.querySelector(
    ".course-info__register-title"
  );
  const courseUpdateEl = $.querySelector(".course-box__update");
  const courseSupportEl = $.querySelector(".course-boxes__box-left--support");
  const courseStatusEl = $.querySelector(".course-boxes__box-left--subtitle");
  fetch(`http://127.0.0.1:4000/v1/courses/${courseShortName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((course) => {
      console.log(course);
      courseTiteEl.innerHTML = course.name;
      courseTextEl.innerHTML = course.description;
      courseCategoryEl.innerHTML = course.categoryID.title;
      courseRegisterStatusEl.insertAdjacentHTML(
        "beforeend",
        course.isUserRegisteredToThisCourse
          ? "دانشجو دوره هستید"
          : "ثبت نام در دوره"
      );
      courseStatusEl.innerHTML = course.isComplete
        ? "تکمیل شده"
        : "در حال برگزاری";

      courseSupportEl.innerHTML = course.support;
      courseUpdateEl.innerHTML = course.updatedAt.slice(0, 10);
    });
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
  inserCategoryHtmlTemplate,
  coursesSorting,
  getCourseDetails,
};
