import config from "../config";
import http from "./httpService";
export function getMovies() {
  return http.get(config.movies);
}

export function deleteMovie(id) {
  return http.delete(config.movies + "/" + id);
}
export default function getMovie(id) {
  return http.get(config.movies + "/" + id);
}

export function saveMovie(movie) {
  const body = { ...movie };
  const genreId = movie.genre._id;
  delete body.genre;
  body.genreId = genreId;

  if (body._id) {
    delete body._id;
    console.log(body);
    return http.put(config.movies + "/" + movie._id, body);
  }
  delete body._id;
  console.log(body);
  return http.post(config.movies, body);
}
