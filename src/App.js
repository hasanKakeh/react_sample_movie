import logo from "./logo.svg";

import React, { Component } from "react";
import "./App.css";
import Movies from "./component/Movies";
import NavBar from "./component/NavBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./component/Customers";
import Rentals from "./component/Rentals";
import NotFound from "./component/NotFound";
import MovieForm from "./component/MovieForm";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Logout from "./component/logout";
import auth from "./services/authServices";

import ProtectedRoute from "./component/ProtectedRoute";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />

        <main className="container">
          <Switch>
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact>
              <Redirect to="/movies" />
            </Route>

            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
