import React, {useState} from 'react';
import './App.css';
import {Bookmarks} from "./components/Bookmarks";

import {TestComponent} from "./components/TestPage/TestComponent";
import {HashRouter as Router, Link, Route, Routes} from "react-router-dom";
import {TestGreeting} from "./components/TestPage/TestGreeting";
import {Menu} from "./components/Menu";
import {Greeting} from "./components/Greeting";
import { NewTestComponent } from './components/TestPage/NewTestComponent';
import { RadarChart } from './components/Analysis/RadarChart';
import {AnalysisGreeting} from "./components/Analysis/AnalysisGreeting";







function App (){
    return(
        <div id="main-menu" >
            <Router>
                <div id="header">
                <nav id = "header-nav">
                    <Link to="/">Home</Link>
                    <Link to="/crud">Edit Data</Link>
                    <Link to="/test">Test</Link>
                    <Link to="/analysis">Analysis</Link>
                </nav>
                </div>
                <div id = "main-body">
                <Routes>
                    <Route path="/" element = {<Greeting/>}/>
                    <Route path="/crud" element = {<Bookmarks/>}/>
                    <Route path="/test" element={<TestGreeting/>}/>
                    <Route path="/testing/:orgId" element={<TestComponent/>}/>
                    <Route path='/analysis' element={<AnalysisGreeting/>}/>
                    <Route path = '/analysis/:orgId' element={<RadarChart/>}></Route>
                </Routes></div>
            </Router>
        </div>
    );
};

// export function Greeting(){
//     return (<div>
//             <h2>Добро пожаловать</h2>
//             <p>Чтобы продолжить, нажмите кнопку Start</p>
//         </div>
//     );
// }


export default App;
