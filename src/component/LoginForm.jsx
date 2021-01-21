import React, { Component } from "react";
import Input from "./Input";
import Joi from "joi-browser";
import Form from "./Form";
import auth, { login } from "../services/authServices";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  //userName = React.createRef();
  // componentDidMount(){
  //     this.userName.current.focus();
  // }
  //   validate = () => {
  //     const errors = {};
  //     const { data } = this.state;
  //     if (data.username.trim() === "")
  //       errors.username = "Username is required.";
  //     if (data.password.trim() === "")
  //       errors.password = "Password is required.";
  //     return Object.keys(errors).length === 0 ? {} : errors;
  //   };

  doSubmit = async () => {
    const { username: email, password } = this.state.data;
    try {
      await auth.login(email, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
    //Call the server
    console.log("submitted");
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
