import {
  showSwal,
  saveIntoLocalStorage,
  getFromLocalStorage,
  getToken,
} from "./utils.js";

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
      } else if (res.status === 403) {
        showSwal(
          "متاسفانه این شماره مجاز به ثبت نام نیست",
          "error",
          "تصحیح اطلاعات",
          () => {}
        );
      }

      return res.json();
    })
    .then((result) => {
      saveIntoLocalStorage("user", { token: result.accessToken });
    });
};

const login = () => {
  const identifierInput = document.querySelector("#identifier");
  const passwordInput = document.querySelector("#password");

  const userInfo = {
    identifier: identifierInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch(`http://127.0.0.1:4000/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  })
    .then((res) => {
      if (res.status === 401) {
        showSwal(
          "کاربری با این اطلاعات یافت نشد",
          "error",
          "تصحیح اطلاعات",
          () => {}
        );
      } else if (res.status === 200) {
        showSwal("با موفقیت وارد شدید", "success", "ورود به پنل", () => {
          location.href = "index.html";
        });
      }
      console.log(res);
      return res.json();
    })
    .then((result) => {
      console.log(result);
      saveIntoLocalStorage("user", { token: result.accessToken });
    });
};

const getMe = async () => {
  const token = getToken();

  if (!token) {
    return false;
  }
  const res = await fetch(`http://127.0.0.1:4000/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
};
export { register, login, getMe };
