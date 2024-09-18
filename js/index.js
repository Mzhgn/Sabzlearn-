const $ = document;
const landingTitle = $.querySelector(".landing__title");

window.addEventListener("load", () => {
  let landingText = "ما به هر قیمتی دوره آموزشی تولید نمیکنیم!";
  let typingIndex = 0;

  typeWriter(landingText, typingIndex);
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
