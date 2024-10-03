import {
  showAllSessions,
  prepareCreateNewSessionForm,
  createNewSession,
} from "./funcs/sessions.js";

window.addEventListener("load", () => {
  const createSessionBtn = document.querySelector("#create-session");

  showAllSessions();
  prepareCreateNewSessionForm();

  createSessionBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createNewSession();
  });
});
