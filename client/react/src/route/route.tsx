import { createBrowserRouter } from "react-router-dom";
import Login from "../modules/login";
import Register from "../modules/register";
import Home from "../modules/home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/home",
        element: <Home/>
    }
])

export default router;