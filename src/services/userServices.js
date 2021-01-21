import http from "./httpService";
import config from "../config";

export function register(user) {
  return http.post(config.users, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
