import {
  getAllCourses,
  getPopularCourses,
  getPresellCourses,
  getAllArticles,
  getNavbarMeues,
  globalSearch,
} from "./funcs/shared.js";

const $ = document;
const landingTitle = $.querySelector(".landing__title");
const landingCoursesCount = $.querySelector("#courses-count");
const landingMinutesCount = $.querySelector("#courses-minutes");
const usersCount = $.querySelector("#users-count");
const globalSearchBtn = $.querySelector("#search-btn");
const globalSearchInput = $.querySelector("#search-input");
const userEmailEl = $.querySelector("#user-email");
const userPhoneEl = $.querySelector("#user-phone");

window.addEventListener("load", () => {
  let landingText = "ما به هر قیمتی دوره آموزشی تولید نمیکنیم!";
  let typingIndex = 0;

  typeWriter(landingText, typingIndex);

  generalIndexInfo();
  getAllCourses();
  getPopularCourses();
  getPresellCourses();
  getAllArticles();
  getNavbarMeues().then((data) => {
    console.log(data);
  });

  // globalSearch
  globalSearchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = `search.html?value=${globalSearchInput.value.trim()}`;
    globalSearch();
  });
});

function typeWriter(text, index) {
  if (index < text.length) {
    landingTitle.innerHTML += text[index];
    index++;
  }
  setTimeout(() => {
    typeWriter(text, index);
  }, 100);
}

function counting(max, el) {
  let counter = 0;

  const interval = setInterval(() => {
    if (counter === max) {
      clearInterval(interval);
    }

    el.innerHTML = counter;
    counter++;
  }, 1);
}

const generalIndexInfo = async () => {
  const res = await fetch(`http://localhost:4000/v1/infos/index`);
  const results = await res.json();

  console.log(res);
  console.log(results);

  userEmailEl.innerHTML = `${results.email}`;
  userPhoneEl.innerHTML = `${results.phone}`;
  let userCountMax = Number(`${results.usersCount}`);
  let courseCountMax = Number(`${results.coursesCount}`);
  let minutesCountMax = Number(`${results.totalTime}`);

  console.log(userCountMax);

  counting(userCountMax, usersCount);
  counting(courseCountMax, landingCoursesCount);
  counting(minutesCountMax, landingMinutesCount);
};
