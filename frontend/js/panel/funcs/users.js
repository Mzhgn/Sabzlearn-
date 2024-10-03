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

export { showAllUsers, removeUser, banUser };
