import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ErrorPage, TimerPage, SpotifyPage, LoaderPage, ThemePage} from "./pages";

export const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "timer",
                element: <TimerPage />,
            },
            {
                path: "spotify",
                element: <SpotifyPage />,
            },
            {
                path: "loader",
                element: <LoaderPage />,
            },
            {
                path: "theme",
                element: <ThemePage />,
            },
        ],
    },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
