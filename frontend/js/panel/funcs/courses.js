const getAllCourses = async () => {
  const coursesTableEl = document.querySelector(".table tbody");
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
export { getAllCourses };
