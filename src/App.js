import React from "react";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Grid from "./components/Grid";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="app__body">
          <Sidebar />
          <Grid />
        </div>
      </div>
    </Router>
  );
}

export default App;
