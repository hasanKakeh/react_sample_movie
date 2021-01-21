import React, { Component } from "react";
import axios from "axios";
import config from "../config.json";
import { getGenres } from "../services/generServices";
import { deleteMovie, getMovies } from "../services/movieServices";
import { paginate } from "../utils/paginate";
import Like from "./Like";

import ListGroup from "./listGroup";
import MoviesTable from "./MoviesTable";
import Pagination from "./Pagination";
import _ from "lodash";
import { Link, Redirect } from "react-router-dom";
import SearchBox from "./SearchBox";
import { genres } from "./../services/fakeGenerService";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: "",
    geners: "",
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data } = await getGenres();
    this.setState({
      movies,
      geners: [{ _id: "", name: "allGeners" }, ...data],
    });
  }
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  deleteMovie = async (movie) => {
    const orginalMovies = this.state.movies;
    const movies = orginalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast.error("this movie has already been deleted.");
      this.setState({ movies: orginalMovies });
    }
  };
  handleLike = (movie) => {
    const movies = this.state.movies.map((m) => {
      if (m._id === movie._id) m.like = !m.like;

      return m;
    });
    console.log(movies);
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalcount: filtered.length, movies };
  };

  handleAddMovie = () => {
    console.log("clicked");
    return;
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  render() {
    const count = this.state.movies.length;
    const {
      pageSize,
      currentPage,
      searchQuery,
      selectedGenre,
      sortColumn,
    } = this.state;
    if (count === 0) return <p>there are no movies to show</p>;
    const { totalcount, movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.geners}
            textProperty="name"
            valueProperty="_id"
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <Link to="/movies/new" className="btn btn-primary">
              New Movie
            </Link>
          )}
          <p>Showing {totalcount} movies in database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.deleteMovie}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalcount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
