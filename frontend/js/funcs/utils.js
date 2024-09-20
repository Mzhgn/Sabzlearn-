const showSwal = (title, icon, buttons, callback) => {
  showSwal({ title, icon, buttons }).then((result) => callback(result));
};

const saveIntoLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

const getFromLocalStorage = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};

const getToken = () => {
  return JSON.parse(localStorage.getItem("user")).token;
};
export { showSwal, saveIntoLocalStorage, getFromLocalStorage, getToken };
