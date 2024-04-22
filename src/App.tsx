import React, {useState} from 'react';
import './App.css';
import {Bookmarks} from "./components/Bookmarks";

import {TestComponent} from "./components/TestPage/TestComponent";
import {HashRouter as Router, Link, Route, Routes} from "react-router-dom";
import {TestGreeting} from "./components/TestPage/TestGreeting";
import {Menu} from "./components/Menu";







function App (){
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuName, setMenuName] = useState<"Start"|"Back">("Start")

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
        if (menuOpen)
            setMenuName("Start")
        else setMenuName("Back")
    };

  return(
      <div className="App">
          <button onClick={toggleMenu}>{menuName}</button>
          {menuOpen && <Menu/>}
          {!menuOpen && <Greeting/>}

      </div>
  )
};

export function Greeting(){
    return (<div>
            <h2>Добро пожаловать</h2>
            <p>Чтобы продолжить, нажмите кнопку Start</p>
        </div>
    );
}


export default App;
