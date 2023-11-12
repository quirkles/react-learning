import {Link, Outlet} from "react-router-dom";
import React from 'react';
import './App.scss';
import {routes} from "./index";

function App() {
  return (
    <div className="App">
        <nav>
            <ul>
                {
                    routes.map((route) =>
                        route.children.map(child => (
                            <li key={child.path}>
                                <Link to={child.path}>{child.path}</Link>
                            </li>
                        ))
                )}
            </ul>
        </nav>
        <Outlet />
    </div>
  );
}

export default App;
