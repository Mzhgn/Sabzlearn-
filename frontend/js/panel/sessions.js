import {
  showAllSessions,
  prepareCreateNewSessionForm,
  createNewSession,
  removeSession,
} from "./funcs/sessions.js";

window.removeSession = removeSession;

window.addEventListener("load", () => {
  const createSessionBtn = document.querySelector("#create-session");

  showAllSessions();
  prepareCreateNewSessionForm();

  createSessionBtn.addEventListener("click", (e) => {
    console.log("logged");

    e.preventDefault();
    createNewSession();
  });
});
