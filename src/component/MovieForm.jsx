import React, { Component } from "react";
import { render } from "@testing-library/react";
import Movies from "./Movies";
import Form from "./Form";
import Joi from "joi-browser";
import getMovie, { saveMovie } from "./../services/movieServices";
import { getGenres } from "../services/generServices";
import { genres } from "./../services/fakeGenerService";
import Select from "./Select";
//import { getGenres } from './../services/fakeGenerService';

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  schema = {
    _id: Joi,
    title: Joi.string().min(5),
    genre: Joi,
    numberInStock: Joi.number().greater(0).less(100),
    dailyRentalRate: Joi.number().greater(-1).less(10),
  };

  handleSave = () => {
    this.props.history.replace("/movies");
  };
  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };
  populateMovies = async () => {
    try {
      const { match } = this.props;
      if (match.params.id === "new") return;
      const { data: movie } = await getMovie(match.params.id);
      this.setState({
        data: movie,
      });
    } catch (e) {
      if (e.response && e.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  };
  componentDidMount = async () => {
    await this.populateGenres();
    await this.populateMovies();
  };
  doSubmit = async () => {
    const movie = this.state.data;

    await saveMovie(movie);
    //console.log(movie);
    this.props.history.push("/movies");
  };
  handleSelect = (e) => {
    const genre = this.state.genres.find(
      (g) => g._id === e.currentTarget.value
    );
    console.log(genre);
    const { _id, title, numberInStock, dailyRentalRate } = this.state.data;
    this.setState({
      data: { _id, title, numberInStock, dailyRentalRate, genre },
    });
  };
  render() {
    return (
      <div>
        {/* <h1> Movies id : {match.params.id}</h1>{" "}
        <button className="btn btn-sm" onClick={this.handleSave}>
          save
        </button> */}

        <h1>Movies Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <Select
            value={this.state.data.genre._id}
            id="genre"
            onChange={this.handleSelect}
            data={this.state.genres}
          />

          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
