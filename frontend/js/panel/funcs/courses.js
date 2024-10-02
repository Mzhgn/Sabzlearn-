import { getToken, showSwal } from "./../../funcs/utils.js";

const getAllCourses = async () => {
  const coursesTableEl = document.querySelector(".table tbody");
  coursesTableEl.innerHTML = "";
  const res = await fetch(`http://127.0.0.1:4000/v1/courses`);
  const courses = await res.json();

  courses.forEach((course, i) => {
    coursesTableEl.insertAdjacentHTML(
      "beforeend",
      `

      <tr>
                      <td>
                       ${i + 1}
                      </td>
                      <td id="id">${course.name}</td>
                      <td id="name">
                        <a> ${course.categoryID}</a>
                      </td>
                      <td id="number">${course.registers}</td>
                      <td id="condition">${course.support}</td>
                      <td id="price">${
                        course.price === 0 ? "رایگان" : course.price
                      }</td>
                      <td id="price">${course.courseAverageScore}</td>
                      <td id="price">${
                        course.isComplete === 0 ? "درحال برگزاری" : "تکمیل شده"
                      }</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-primary"
                          id="edit-btn"
                        >
                          ویرایش
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger"
                          id="delete-btn"
                          onclick="removeCourse('${course._id}')"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
      `
    );
  });

  return courses;
};
let categoryID = -1;
let status = "start";
let courseCover = null;

const prepareCreateCourseForm = async () => {
  const categoryListEl = document.querySelector(".category-list");
  const coursePrsellEl = document.querySelector("#presell");
  const courseStartEl = document.querySelector("#start");
  const courseCoverEl = document.querySelector("#course-cover");

  const res = await fetch(`http://127.0.0.1:4000/v1/category`);
  const categoryItems = await res.json();

  categoryItems.forEach((item) => {
    categoryListEl.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${item._id}">${item.title}</option>`
    );
  });

  categoryListEl.addEventListener("change", (e) => {
    categoryID = e.target.value;
    console.log(categoryID);
  });

  coursePrsellEl.addEventListener("change", (e) => {
    status = e.target.value;
  });
  courseStartEl.addEventListener("change", (e) => {
    status = e.target.value;
    console.log("hi");
  });

  courseCoverEl.addEventListener("change", (e) => {
    courseCover = e.target.files[0];
  });
};
const createNewCourse = async () => {
  const courseNameEl = document.querySelector("#course-name");
  const coursePriceEl = document.querySelector("#course-price");
  const courseDescriptionEl = document.querySelector("#course-description");
  const courseShortnameEl = document.querySelector("#course-shortname");
  const courseSupportEl = document.querySelector("#course-support");
  const formData = new FormData();
  formData.append("name", courseNameEl.value.trim());
  formData.append("price", coursePriceEl.value.trim());
  formData.append("description", courseDescriptionEl.value.trim());
  formData.append("shortName", courseShortnameEl.value.trim());
  formData.append("support", courseSupportEl.value.trim());
  formData.append("categoryID", categoryID);
  formData.append("status", status);
  formData.append("cover", courseCover);

  const res = await fetch(`http://localhost:4000/v1/courses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });
  console.log(res);

  if (res.ok) {
    showSwal("دوره جدید ساخته شد", "success", "عالیه", () => {
      getAllCourses();
    });
  }
};

const removeCourse = async (courseID) => {
  showSwal(
    "آیا از حذف دوره اطمینان دارید؟",
    "warning",
    ["خیر", "بله"],
    async (result) => {
      if (result) {
        const res = await fetch(
          `http://localhost:4000/v1/courses/${courseID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        if (res.ok) {
          showSwal("دوره موردنظر با موفقیت حذف شد", "success", "عالیه", () => {
            getAllCourses();
          });
        }
      }
    }
  );
};
export {
  getAllCourses,
  createNewCourse,
  prepareCreateCourseForm,
  removeCourse,
};
