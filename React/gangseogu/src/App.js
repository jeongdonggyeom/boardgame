import './App.css';
import React from "react";
import Header from "./components/header"
import Navbar from "./components/navbar"
import Weather from "./components/weather"

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Weather />
    </div>
  );
}

export default App;
