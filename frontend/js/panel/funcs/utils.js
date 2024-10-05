import { getToken } from "./../../funcs/utils.js";

const getAdminInfo = async () => {
  const res = await fetch(`http://127.0.0.1:4000/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  console.log(res);

  const admin = await res.json();

  return admin;
};

const logout = () => {
  localStorage.removeItem("user");
  return true;
};

export { getAdminInfo, logout };
