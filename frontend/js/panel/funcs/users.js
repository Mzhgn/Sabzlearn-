import { getToken } from "../../funcs/utils.js";

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
                    <button type='button' class='btn btn-danger delete-btn'>بن</button>
                </td>
            </tr>
        `
    );
  });

  console.log(users);
};

export { showAllUsers };
