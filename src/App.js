import React from "react";
import Futbol from "./Futbol";
import './App.css'
import Baloncesto from './Baloncesto'
import Menu from './Menu'

const App = () => {
  return (
    <div>
      <div className="container-general-app">
      <Futbol />
      <Baloncesto/>
      </div>
     
     
      <Menu/>
      
     
    </div>
  );
};

export default App;
