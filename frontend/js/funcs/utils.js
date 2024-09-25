const showSwal = (title, icon, buttons, callback) => {
  swal({ title, icon, buttons }).then((result) => callback(result));
};

const saveIntoLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};

const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  return userInfo ? userInfo.token : null;
};

const isLogin = () => {
  const userInfo = localStorage.getItem("user");
  return userInfo ? true : false;
};

const getUrlParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

export {
  showSwal,
  saveIntoLocalStorage,
  getFromLocalStorage,
  getToken,
  isLogin,
  getUrlParam,
};
