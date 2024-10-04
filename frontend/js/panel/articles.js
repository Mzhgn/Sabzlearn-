import {
  showAllArticles,
  createNewArticle,
  prepareNewArticleForm,
  removeArticle,
} from "./funcs/articles.js";

window.removeArticle = removeArticle;

window.addEventListener("load", () => {
  const createArticleBtn = document.querySelector("#create-article");

  showAllArticles();
  prepareNewArticleForm();
  createArticleBtn.addEventListener("click", (event) => {
    console.log("logged btn");
    event.preventDefault();
    createNewArticle();
  });
});
