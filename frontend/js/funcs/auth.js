import { showSwal } from "./utils.js";

const register = () => {
  const nameInput = document.querySelector("#name");
  const usernameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const passwordInput = document.querySelector("#password");

  const newUserInfo = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: passwordInput.value.trim(),
  };

  fetch(`http://127.0.0.1:4000/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfo),
  })
    .then((res) => {
      if (res.status === 201) {
        showSwal(
          "ثبت نام با موفقیت انجام شد!",
          "success",
          "ورود به پنل",
          (result) => {
            location.href = "index.html";
          }
        );
      } else if (res.status === 409) {
        showSwal(
          "نام کاربری یا ایمیل تکراری است!",
          "error",
          "تصحیح اطلاعات",
          () => {}
        );
      }
      return res.json();
    })
    .then((result) => console.log(result));
};

export { register };
