import { getToken, showSwal } from "../../funcs/utils.js";

let courseID = null;

const showAllDiscountsCodes = async () => {
  const discountCodesTableElem = document.querySelector(".table tbody");
  discountCodesTableElem.innerHTML = "";

  const res = await fetch(`http://127.0.0.1:4000/v1/offs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const discountCodes = await res.json();
  discountCodes.forEach((code, index) => {
    discountCodesTableElem.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td id="id">${code.code}</td>
                <td id="number">${code.creator}</td>
                <td>${code.percent}</td>
                <td id="price">${code.max}</td>
                <td id="price">${code.uses}</td>
                <td id="price">${code.createdAt.slice(0, 10)}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" onclick="removeDiscount('${
                      code._id
                    }')" class="btn btn-danger" id="delete-btn">حذف</button>
                </td>
            </tr>
        `
    );
  });
};

const prepareCreateNewDiscountCodeForm = async () => {
  const coursesListSelectEl = document.querySelector("#courses-select");

  const courseRes = await fetch(`http://127.0.0.1:4000/v1/courses`);
  const courses = await courseRes.json();

  courses
    .filter((course) => course.price !== 0)
    .forEach((course) => {
      coursesListSelectEl.insertAdjacentHTML(
        "beforeend",
        `
      <option value="${course._id}">${course.name}</option>
    `
      );
    });

  coursesListSelectEl.addEventListener(
    "change",
    (event) => (courseID = event.target.value)
  );
};

const createDiscountCode = async () => {
  const codeInputElem = document.querySelector("#code");
  const percentInputElem = document.querySelector("#percent");
  const maxInputElem = document.querySelector("#max");

  const newDiscountCodeInfo = {
    code: codeInputElem.value.trim(),
    percent: percentInputElem.value.trim(),
    max: maxInputElem.value.trim(),
    course: courseID,
  };

  const res = await fetch("http://127.0.0.1:4000/v1/offs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDiscountCodeInfo),
  });

  if (res.ok) {
    showSwal(
      "کد تخفیف مورد نظر با موفقیت ایجاد شد",
      "success",
      "  عالیه",
      () => {
        showAllDiscountsCodes();
      }
    );
  }
};

const removeDiscount = async (discountID) => {
  showSwal(
    "آیا از حذف کد تخفیف اطمینان دارید؟",
    "warning",
    ["نه", "آره"],
    async (result) => {
      if (result) {
        const res = await fetch(`http://127.0.0.1:4000/v1/offs/${discountID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (res.ok) {
          showSwal(
            "کد تخفیف مورد نظر با موفقیت حذف شد",
            "success",
            "خیلی هم عالی",
            () => {
              showAllDiscountsCodes();
            }
          );
        }
      }
    }
  );
};

export {
  showAllDiscountsCodes,
  prepareCreateNewDiscountCodeForm,
  createDiscountCode,
  removeDiscount,
};
