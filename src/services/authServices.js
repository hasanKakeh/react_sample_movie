import http from "./httpService";
import config from "../config";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
export async function login(email, password) {
  const { data: jwt } = await http.post(config.auth, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}
http.setJwt(getJwt());
export function getJwt() {
  return localStorage.getItem(tokenKey);
}


export default { logout, login, getCurrentUser, getJwt, loginWithJwt };
