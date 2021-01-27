import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
import { render } from "@testing-library/react";
import Input from "./Input";
class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const options = { abortEarly: false };
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema, options);
    return error ? error.details[0].message : null;
    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required.";
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required.";
    // }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    // const userName = this.userName.current.value;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    return (
      <Input
        type={type}
        name={name}
        value={this.state.data[name]}
        onChange={this.handleChange}
        label={label}
        error={this.state.errors[name]}
      />
    );
  }
}

export default Form;
