import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import App from "./components/App";

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route
        component={() => (
          <App />
        )}
      />
    </Routes>
  </Router>,
  document.getElementById("root")
);
