import config from "../config";
import http from "./httpService";
export function getGenres() {
 return http.get(config.genres);
}
