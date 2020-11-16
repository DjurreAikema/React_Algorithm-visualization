import React from "react";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Grid from "./components/Grid";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import test1 from './pages/test1'
import test2 from './pages/test2'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="app__body">
          <Sidebar />
          {/* <Grid /> */}
          <Switch>
            <Route path="/grid" component={Grid} />
            <Route path="/test1" component={test1} />
            <Route path="/test2" component={test2} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
