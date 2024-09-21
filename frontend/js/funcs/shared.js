import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

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
                <div class="course-box">
                  <a href="#">
                    <img
                      src="images/courses/fareelancer.png"
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

  return courses;
};

export { showUserNameNavbar, renderTopbarMenu, getAllCourses };
