import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Register/SignUpForm";
import SignIn from "../pages/Login/LoginForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: "/signup", element: <SignUp /> },
      { path: "/sign-in", element: <SignIn /> },
    ],
  },
]);
