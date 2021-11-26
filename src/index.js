import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import App from "./components/App";
import MyContainer from "./components/MyContainer";
import GlobalContext from "./context";

ReactDOM.render(
  <React.StrictMode>
    <GlobalContext>
      <MyContainer>
        <BrowserRouter>
          <Navbar />
          <App />
        </BrowserRouter>
      </MyContainer>
    </GlobalContext>
  </React.StrictMode>,
  document.getElementById("root")
);
