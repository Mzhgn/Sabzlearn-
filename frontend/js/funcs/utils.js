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

const searchInArray = (array, searchProperty, searchValue) => {
  let outputArray = array.filter((item) =>
    item[searchProperty].includes(searchValue)
  );
  return outputArray;
};

const addParamToUrl = (param, value) => {
  let url = new URL(location.href);
  let searchParams = url.searchParams;

  searchParams.set(param, value);
  url.search = searchParams.toString();
  location.href = url.toString();
};

const paginatedItems = (array, itemsPerPage, parentEl, currentPage) => {
  parentEl.innerHTML = "";
  let endIndex = itemsPerPage * currentPage;
  let startIndex = endIndex - itemsPerPage;
  let itemsPaginated = array.slice(startIndex, endIndex);
  let paginatedNumber = Math.ceil(array.length / itemsPerPage);

  for (let i = 1; i < paginatedNumber + 1; i++) {
    parentEl.insertAdjacentHTML(
      "beforeend",
      `
      <li class="courses__pagination-item">
      ${
        i === Number(currentPage)
          ? ` <a  onclick="addParamToUrl('page',${i})" class="courses__pagination-link courses__pagination-link--active"> ${i} </a>`
          : `<a  onclick="addParamToUrl('page',${i})" class="courses__pagination-link"> ${i} </a>`
      }
      </li>
      `
    );
  }
  return itemsPaginated;
};

export {
  showSwal,
  saveIntoLocalStorage,
  getFromLocalStorage,
  getToken,
  isLogin,
  getUrlParam,
  searchInArray,
  paginatedItems,
  addParamToUrl,
};
