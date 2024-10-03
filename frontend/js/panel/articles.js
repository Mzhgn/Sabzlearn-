import {
  showAllArticles,
  createNewArticle,
  prepareNewArticleForm,
} from "./funcs/articles.js";

window.addEventListener("load", () => {
  const createArticleBtn = document.querySelector("#create-article");

  showAllArticles();
  prepareNewArticleForm();
  createArticleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createNewArticle();
  });
});
