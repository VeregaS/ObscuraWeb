import React from "react";
import * as ReactDomClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./colors/light_index.css";

const app = ReactDomClient.createRoot(document.getElementById("root"));

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
