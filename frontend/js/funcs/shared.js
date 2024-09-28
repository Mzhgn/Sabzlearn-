import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken, showSwal } from "./utils.js";

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
  const courseTiteEl = $.querySelector(".course-info__title");
  const courseTextEl = $.querySelector(".course-info__text");
  const courseCategoryEl = $.querySelector(".course-info__link");
  const courseRegisterStatusEl = $.querySelector(
    ".course-info__register-title"
  );
  const courseUpdateEl = $.querySelector(".course-box__update");
  const courseSupportEl = $.querySelector(".course-boxes__box-left--support");
  const courseStatusEl = $.querySelector(".course-boxes__box-left--subtitle");
  const courseCommentsEl = $.querySelector(".course-info__total-comment-text");
  const courseStudentEl = $.querySelector(".course-info__total-sale-number");
  const coursePeriodEl = $.querySelector(".coursePeriod");
  const showCommentsEl = $.querySelector(".comments__content");

  fetch(`http://127.0.0.1:4000/v1/courses/${courseShortName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((course) => {
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
      courseCommentsEl.innerHTML = `${course.comments.length} دیدگاه `;
      courseStudentEl.innerHTML = course.courseStudentsCount;
      // show course sessions
      const sessionsWrapper = $.querySelector(".sessions-wrapper");

      console.log(course.sessions);

      if (course.sessions.length) {
        course.sessions.forEach((session, i) => {
          sessionsWrapper.insertAdjacentHTML(
            "beforeend",
            `  <div
                          class="accordion-body introduction__accordion-body"
                        >
                          <div class="introduction__accordion-right">
                            <span class="introduction__accordion-count">${
                              i + 1
                            }</span>
                            <i
                              class="fab fa-youtube introduction__accordion-icon"
                            ></i>
                            ${
                              session.free ||
                              course.isUserRegisteredToThisCourse
                                ? `<a href="episode.html?name=${
                                    course.shortName
                                  }&id=${
                                    session._id
                                  }"      class="introduction__accordion-link">
                              ${session.title}
                                    </a>
                                   </div>
                                   <div class="introduction__accordion-left">
                            <span class="introduction__accordion-time">
                              ${session.time} ${
                                    !(
                                      session.free ||
                                      course.isUserRegisteredToThisCourse
                                    )
                                      ? `<i class="fa fa-lock"></i>`
                                      : ``
                                  }
                            </span>
                          </div>
                                    `
                                : `<span class="introduction__accordion-link">
                              ${session.title}
                                   </span>
                                   </div>

                                   <div class="introduction__accordion-left">
                            <span class="introduction__accordion-time">
                              ${session.time} ${
                                    !(
                                      session.free ||
                                      course.isUserRegisteredToThisCourse
                                    )
                                      ? `<i class="fa fa-lock"></i>`
                                      : ``
                                  }
                            </span>
                          </div>
                                    `
                            }
                            
                          
                        </div>`
          );
        });
      } else {
        sessionsWrapper.insertAdjacentHTML(
          "beforeend",
          `  <div
                          class="accordion-body introduction__accordion-body"
                        >
                          <div class="introduction__accordion-right">
                            <span class="introduction__accordion-count">--
                              
                            </span>
                            <i
                              class="fab fa-youtube introduction__accordion-icon"
                            ></i>
                            <a href="#" class="introduction__accordion-link">
                             برای این دوره جلسه ای بارگذاری نشده است
                            </a>
                          </div>
                          <div class="introduction__accordion-left">
                            <span class="introduction__accordion-time">
                              00:00
                            </span>
                          </div>
                        </div>`
        );
      }
      // courses comments
      course.comments.forEach((comment) => {
        showCommentsEl.insertAdjacentHTML(
          "beforeend",
          `  <div class="comments__item">
              <div class="comments__question">
                  <div class="comments__question-header">
                      <div class="comments__question-header-right">
                          <span class="comments__question-name comment-name">${
                            comment.creator.name
                          }</span>
                          <span class="comments__question-status comment-status">
                          (${
                            comment.creator.role === "USER" ? "دانشجو" : "مدرس"
                          })
                              </span>
                          <span class="comments__question-date comment-date">${comment.createdAt.slice(
                            0,
                            10
                          )}</span>
                      </div>
                      <div class="comments__question-header-left">
                          <a class="comments__question-header-link comment-link" href="#">پاسخ</a>
                      </div>
                  </div>
                  <div class="comments__question-text">
                     
                      <p class="comments__question-paragraph comment-paragraph">
                        ${comment.body}
                      </p>
                  </div>
              </div>
              ${
                comment.answerContent
                  ? `
                    <div class="comments__ansewr">
                        <div class="comments__ansewr-header">
                            <div class="comments__ansewr-header-right">
                                <span class="comments__ansewr-name comment-name">
                               ${comment.answerContent.creator.name}
                                    </span>
                                <span class="comments__ansewr-staus comment-status">
                                  (${
                                    comment.creator.role === "USER"
                                      ? "دانشجو"
                                      : "مدرس"
                                  })
                                </span>
                                <span class="comments__ansewr-date comment-date">1401/04/21</span>
                            </div>
                            <div class="comments__ansewr-header-left">
                                <a class="comments__ansewr-header-link comment-link" href="#">پاسخ</a>
                            </div>
                        </div>
                        <div class="comments__ansewr-text">
                            <p class="comments__ansewr-paragraph comment-paragraph">
                              ${comment.answerContent.body}
                            </p>
                        </div>
                    </div>
                  `
                  : ""
              }
            </div>
        `
        );
      });
    });
};

const getRelatedCourses = async () => {
  const courseShortName = getUrlParam("name");

  const relatedCoursesLists = document.querySelector(".course-info__lists");
  const res = await fetch(
    `http://127.0.0.1:4000/v1/courses/related/${courseShortName}`
  );
  // console.log(res);
  const relatedCourses = await res.json();

  if (relatedCourses.length) {
    relatedCourses.forEach((course) => {
      relatedCoursesLists.insertAdjacentHTML(
        "beforeend",
        `<li class="course-info__lists-item">
                    <a href="course.html?name=${course.shortName}" class="course-info__lists-link">
                      <img
                        src="http://127.0.0.1:4000/courses/covers/${course.cover}"
                        alt="course cover image"
                        class="course-info__lists-img"
                      />
                      <span class="course-info__courses-title"
                        >   ${course.name} </span
                      >
                    </a>
                  </li>`
      );
    });
  } else {
  }
  return relatedCourses;
};

const getSessionDetails = async () => {
  const courseShortName = getUrlParam("name");
  const sessionID = getUrlParam("id");
  const sessionVideoEl = document.querySelector(".episode-content__video");
  const sessionsListsEl = document.querySelector(".sidebar-topics__list");

  fetch(`http://127.0.0.1:4000/v1/courses/${courseShortName}/${sessionID}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((sessionData) => {
      console.log(sessionData);
      sessionVideoEl.setAttribute(
        "src",
        `http://127.0.0.1:4000/courses/covers/${sessionData.session.video}`
      );
      sessionData.sessions.forEach((session) => {
        sessionsListsEl.insertAdjacentHTML(
          "beforeend",
          `<li class="sidebar-topics__list-item">
                  <div class="sidebar-topics__list-right">
                    <i
                      class="sidebar-topics__list-item-icon fa fa-play-circle"
                    ></i>
                    
                    ${
                      session.free
                        ? `<a class="sidebar-topics__list-item-link" href="episode.html?name${courseShortName}&id=${session._id}"
                      >${session.title}</a
                    >`
                        : `<span class="sidebar-topics__list-item-link" 
                      >${session.title}</span
                    >`
                    }
                  </div>
                  <div class="sidebar-topics__list-left">
                    <span class="sidebar-topics__list-item-time">${
                      session.time
                    }${
            !session.free ? `<i class="fa fa-lock"></i>` : ` `
          }</span>
                  </div>
                </li>`
        );
      });
    });
};

const submitContactUs = async () => {
  const nameInputEl = document.querySelector("#name");
  const emailInputEl = document.querySelector("#email");
  const phoneInputEl = document.querySelector("#phone");
  const bodyInputEl = document.querySelector("#body");

  const newContactUsInfo = {
    name: nameInputEl.value.trim(),
    email: emailInputEl.value.trim(),
    phone: phoneInputEl.value.trim(),
    body: bodyInputEl.value.trim(),
  };
  const res = await fetch(`http://127.0.0.1:4000/v1/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContactUsInfo),
  });
  const resultContactUs = await res.json();
  console.log(res);

  if (res.status === 201) {
    showSwal(
      "پیغام با موفقیت ارسال شد!",
      "success",
      "ورود به پنل",
      (result) => {
        location.href = "index.html";
      }
    );
  } else {
    showSwal(
      "مشکلی در ارسال پیغام وجود دارد \n  مجددا امتحان کنید",
      "error",
      "ورود صفحه اصلی",
      (result) => {
        location.href = "index.html";
      }
    );
  }
};

const createNewsletter = async () => {
  const newsLetterInput = document.querySelector("#news-letter-input");

  const newsLetterEmailObj = {
    email: newsLetterInput.value.trim(),
  };
  const res = await fetch(`http://127.0.0.1:4000/v1/newsletters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newsLetterEmailObj),
  });
  console.log("res:", res);
  if (res.ok) {
    showSwal(
      "با موفقیت در خبرنامه سبزلرن عضو شدید",
      "success",
      "متوجه شدم",
      () => {}
    );
    console.log("res:", res);
  } else {
  }
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
  getRelatedCourses,
  getSessionDetails,
  submitContactUs,
  createNewsletter,
};
