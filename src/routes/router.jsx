import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Register/SignUpForm";
import SignIn from "../pages/Login/LoginForm";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/Home/DashboardHome";
import TutorRequest from "../pages/Dashboard/TutorRequest/TutorRequest";
import Tuition from "../pages/Tuition/Tuition";
import TuitionDetails from "../pages/Dashboard/TutorRequest/TuitionDetails";
import TeacherRequest from "../pages/Dashboard/TeacherRequest/TeacherRequest";
import TeacherListingPage from "../pages/TeacherListingPage/TeacherListingPage";
import TeacherProfileDetails from "../pages/TeacherListingPage/TeacherProfileDetails";
import MyTuitions from "../pages/Dashboard/MyTuitions/MyTuitions";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import UserManagment from "../pages/Dashboard/UserManagment/UserManagment";
import TuitionManagement from "../pages/Dashboard/TuitionManagement/TuitionManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/tuition",
        Component: Tuition,
      },
      {
        path: "/tutor-request/:id",
        Component: TuitionDetails,
      },
      {
        path: "/teacher-profile",
        Component: TeacherListingPage,
      },
      {
        path: "/teacher-profile/:id",
        Component: TeacherProfileDetails,
      },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },

  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "tutor-request",
        element: <TutorRequest></TutorRequest>,
      },
      {
        path: "my-tuitions",
        element: <MyTuitions></MyTuitions>,
      },
      {
        path: "teacher-request",
        element: <TeacherRequest></TeacherRequest>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "user-management",
        element: <UserManagment></UserManagment>,
      },
      {
        path: "tuition-management",
        element: <TuitionManagement></TuitionManagement>,
      },
    ],
  },
]);
