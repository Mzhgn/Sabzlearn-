import { getToken, showSwal } from "../../funcs/utils.js";

const showAllUsers = async () => {
  const usersListTableEl = document.querySelector(".table tbody");
  usersListTableEl.innerHTML = "";

  const res = await fetch(`http://localhost:4000/v1/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const users = await res.json();

  users.forEach((user, index) => {
    usersListTableEl.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.role === "ADMIN" ? "مدیر" : "کاربر عادی"}</td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn'>حذف</button>
                </td>
                <td>
                    <button type='button' onclick="banUser('${
                      user._id
                    }')" class='btn btn-danger delete-btn'>بن</button>
                </td>
            </tr>
        `
    );
  });

  console.log(users);
};
const removeUser = async (userID) => {
  showSwal(
    "آیا از حذف کاربر اطمینان دارید؟",
    "warning",
    ["نه", "آره"],
    async (result) => {
      if (result) {
        const res = await fetch(`http://127.0.0.1:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (res.ok) {
          showSwal(
            "کاربر مورد نظر با موفقیت حذف شد",
            "success",
            "خیلی هم عالی",
            () => {
              showAllUsers();
            }
          );
        }
      }
    }
  );
};

const banUser = async (userID) => {
  showSwal(
    "آیا از بن کاربر اطمینان دارید؟",
    "error",
    ["خیر", "بله"],
    async (result) => {
      if (result) {
        const res = await fetch(
          `http://localhost:4000/v1/users/ban/${userID}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        console.log(res);
        if (res.ok) {
          showSwal(
            "کاربر مورد نظر با موفقیت بن شد",
            "success",
            " عالیه ",
            () => {}
          );
        }
      }
    }
  );
};

const createNewUser = async () => {
  const nameInput = document.querySelector("#name");
  const usernameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const passwordInput = document.querySelector("#password");

  const newUserInfos = {
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
    body: JSON.stringify(newUserInfos),
  }).then((res) => {
    if (res.status === 201) {
      showSwal(
        "کاربر جدید با موفقیت ایجاد شد",
        "success",
        "خیلی  عالی",
        (result) => {
          showAllUsers();
        }
      );
    } else if (res.status === 409) {
      showSwal(
        "نام کاربری یا ایمیل قبلا استفاده شده",
        "error",
        "تصحیح اطلاعات",
        () => {}
      );
    } else if (res.status === 403) {
      showSwal(
        "متاسفانه این شماره تماس بن شده",
        "error",
        "تصحیح اطلاعات",
        () => {}
      );
    }
    console.log(res);
    return res.json();
  });
};

export { showAllUsers, removeUser, banUser, createNewUser };
