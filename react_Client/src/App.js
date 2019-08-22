import "./App.css";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./container";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}

export default App;
