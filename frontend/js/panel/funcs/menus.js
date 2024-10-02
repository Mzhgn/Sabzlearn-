import { getToken, showSwal } from "./../../funcs/utils.js";

let parentMenuID = undefined;

const showAllMenus = async () => {
  const menusWrapperEl = document.querySelector(".table tbody");

  const res = await fetch(`http://127.0.0.1:4000/v1/menus/all`);
  const menus = await res.json();

  menus.forEach((menu, index) => {
    menusWrapperEl.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
          <td>${index + 1}</td>
          <td>${menu.title}</td>
          <td><a href="#">${menu.href}</a></td>
          <td>
            ${menu.parent ? menu.parent.title : " --- "}
          </td>
          <td>
              <button type="button" class="btn btn-primary edit-btn">ویرایش</button>
          </td>
          <td>
              <button type="button" class="btn btn-danger delete-btn"   onclick="removeMenu('${
                menu._id
              }')">حذف</button>
          </td>
      </tr>
    `
    );
  });

  return menus;
};
const prepareCreateMenuForm = async () => {
  const parentMenusEl = document.querySelector("#parent-menus");

  parentMenusEl.addEventListener(
    "change",
    (e) => (parentMenuID = e.target.value)
  );
  const res = await fetch("http://127.0.0.1:4000/v1/menus");
  const menus = await res.json();

  menus.forEach((menu) => {
    parentMenusEl.insertAdjacentHTML(
      "beforeend",
      `
      <option value=${menu._id}>${menu.title}</option>
    `
    );
  });
};
const createNewMenu = async () => {
  const titleEl = document.querySelector("#title");
  const hrefEl = document.querySelector("#href");

  const newMenuInfo = {
    title: titleEl.value.trim(),
    href: hrefEl.value.trim(),
    parent: parentMenuID,
  };

  const res = await fetch(`http://127.0.0.1:4000/v1/menus`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMenuInfo),
  });

  if (res.ok) {
    showSwal("منوی جدید با موفقیت ساخته شد", "success", "  عالیه", () => {
      showAllMenus();
    });
  }

  console.log(res);
};

const removeMenu = async (menuID) => {
  showSwal(
    "آیا از حذف منو اطمینان دارید؟",
    "warning",
    ["نه", "بله"],
    async (result) => {
      if (result) {
        const res = await fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        console.log(res);
        if (res.ok) {
          showSwal(
            "منوی مورد نظر با موفقیت حذف شد",
            "success",
            "  عالیه",
            () => {
              showAllMenus();
            }
          );
        }
      }
    }
  );
};

export { showAllMenus, prepareCreateMenuForm, createNewMenu, removeMenu };
