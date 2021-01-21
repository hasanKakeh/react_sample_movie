import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import Table from "./Table";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import auth from "../services/authServices";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      lable: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <Like liked={movie.like} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete", 
      content: (movie) => {
        console.log(auth.getCurrentUser());
        return (
          auth.getCurrentUser() &&
          auth.getCurrentUser().isAdmin && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.props.onDelete(movie)}
            >
              Delete
            </button>
          )
        );
      },
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
          movies={movies}
        />
      </div>
    );
  }
}

export default MoviesTable;
