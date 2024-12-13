import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import App from "../../App";
import Register from "../../Pages/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path:'/register',
        element: <Register />
    }
])