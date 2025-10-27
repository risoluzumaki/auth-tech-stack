import { createBrowserRouter } from "react-router-dom";
import Login from "../modules/login";
import Register from "../modules/register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
])

export default router;