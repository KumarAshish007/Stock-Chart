import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Footer from "./uielements/footer/Footer";
import ChartMain from "./charts/ChartMain";
import Navbar from "./uielements/Navbar";
function App() {
  let router;
  router = (
    <Switch>
      <Route path="/" component={ChartMain} exact />
      <Redirect to="/" exact />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Navbar />
      <main>{router}</main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
