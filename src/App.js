import React from "react";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Grid from "./components/Grid";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app__body">
        <Sidebar />
        {/* <Main /> */}
        <Grid />
      </div>
    </div>
  );
}

export default App;
