import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeComponet from "../Components/HomeComponet";
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
        path: "/signup",
        element: <Register />,
    },
    {
      path: "/home",
      element: <HomeComponet />,
    }
  ]);