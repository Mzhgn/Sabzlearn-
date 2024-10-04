import { getToken, showSwal } from "./../../funcs/utils.js";

const showAllComments = async () => {
  const commentsListTableEl = document.querySelector(".table tbody");
  commentsListTableEl.innerHTML = "";

  const res = await fetch(`http://127.0.0.1:4000/v1/comments`);
  const comments = await res.json();

  comments.forEach((comment, index) => {
    commentsListTableEl.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td class="${
                  comment.answer === 1 ? "answer-comment" : "no-answer-comment"
                }">${index + 1}</td>
                <td>${comment.creator.name}</td>
                <td>${comment.course}</td>
                <td>${comment.createdAt.slice(0, 10)}</td>
                <td>${comment.score}</td>
                <td>
                    <button type='button' onclick="showCommentBody('${
                      comment.body
                    }')" class='btn btn-primary edit-btn'>مشاهده</button>
                </td>
                <td>
                    <button type='button' onclick="answerToComment('${
                      comment._id
                    }')" class='btn btn-primary edit-btn'>پاسخ</button>
                </td>
                <td>
                    <button type='button' onclick="acceptComment('${
                      comment._id
                    }')" class='btn btn-primary edit-btn'>تایید</button>
                </td>
                <td>
                    <button type='button' onclick="rejectComment('${
                      comment._id
                    }')" class='btn btn-primary edit-btn'>رد</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn'>حذف</button>
                </td>
            </tr>
        `
    );
  });
};

export { showAllComments };
