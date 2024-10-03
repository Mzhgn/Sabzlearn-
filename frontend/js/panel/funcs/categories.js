import { getToken, showSwal } from "../../funcs/utils.js";

const showAllCategories = async () => {
  const categoriesListEl = document.querySelector(".table tbody");
  categoriesListEl.innerHTML = "";

  const res = await fetch(`http://127.0.0.1:4000/v1/category`);
  const categories = await res.json();

  console.log(categories);

  categories.forEach((category, index) => {
    categoriesListEl.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td>${index + 1}</td>
                <td>${category.title}</td>
                <td>${category.name}</td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                    <button type='button' onclick="removeCategory('${
                      category._id
                    }')" class='btn btn-danger delete-btn'>حذف</button>
                </td>
            </tr>
        `
    );
  });
};

const removeCategory = async (categoryID) => {
  showSwal(
    "آیا از حذف دسته بندی اطمینان دارید؟",
    "warning",
    ["خیر", "بله"],
    async (result) => {
      if (result) {
        const res = await fetch(
          `http://127.0.0.1:4000/v1/category/${categoryID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (res.ok) {
          showSwal(
            "دسته بندی مورد نظر با موفقیت حذف شد",
            "success",
            "خیلی هم عالی",
            () => {
              showAllCategories();
            }
          );
        }
      }
    }
  );
};

const createNewCategory = async () => {
  const titleInputEl = document.querySelector("#title");
  const nameInputEl = document.querySelector("#name");

  const newCategoryInfo = {
    title: titleInputEl.value.trim(),
    name: nameInputEl.value.trim(),
  };

  const res = await fetch("http://127.0.0.1:4000/v1/category", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategoryInfo),
  });

  if (res.ok) {
    showSwal(
      "دسته بندی جدید با موفقیت ساخته شد",
      "success",
      "خیلی هم عالی",
      () => {
        showAllCategories();
      }
    );
  }

  console.log(res);
};

export { showAllCategories, removeCategory, createNewCategory };
