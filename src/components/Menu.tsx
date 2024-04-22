import React from "react";
import {HashRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Bookmarks} from "./Bookmarks";
import {TestGreeting} from "./TestPage/TestGreeting";
import {TestComponent} from "./TestPage/TestComponent";

export function Menu(){
    return(
        <div id="menu">
            <Router>
                <nav id = "header-nav">
                    <Link to="/crud">CRUD</Link>
                    <Link to="/test">Test</Link>
                </nav>
                <Routes>
                    <Route path="/crud" element = {<Bookmarks/>}/>
                    <Route path="/test" element={<TestGreeting/>}/>
                    <Route path="/testing/:orgId" element={<TestComponent/>}></Route>
                </Routes>
            </Router>
        </div>
    );
}