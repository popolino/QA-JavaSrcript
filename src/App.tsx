import React from "react";
import "./assets/scss/reset.scss";
import "./assets/scss/global.scss";
import "./App.scss";
import Router from "./routes/Router";

function App() {
  return (
    <div className="container">
      <Router />
    </div>
  );
}

export default App;
