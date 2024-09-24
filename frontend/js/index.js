import {
  getAllCourses,
  getPopularCourses,
  getPresellCourses,
  getAllArticles,
  getNavbarMeues,
} from "./funcs/shared.js";

const $ = document;
const landingTitle = $.querySelector(".landing__title");
const landingCoursesCount = $.querySelector("#courses-count");
const landingMinutesCount = $.querySelector("#courses-minutes");
const usersCount = $.querySelector("#users-count");

window.addEventListener("load", () => {
  let landingText = "ما به هر قیمتی دوره آموزشی تولید نمیکنیم!";
  let typingIndex = 0;

  typeWriter(landingText, typingIndex);
  counting(40, landingCoursesCount);
  counting(520, landingMinutesCount);
  counting(3251, usersCount);

  getAllCourses();
  getPopularCourses();
  getPresellCourses();
  getAllArticles();
  getNavbarMeues().then((data) => {
    console.log(data);
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
