import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Register/SignUpForm";
import SignIn from "../pages/Login/LoginForm";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/Home/DashboardHome";
import TutorRequest from "../pages/Dashboard/TutorRequest/TutorRequest";
import Tuition from "../pages/Tuition/Tuition";
import TeacherRequest from "../pages/Dashboard/TeacherRequest/TeacherRequest";
import TeacherListingPage from "../pages/TeacherListingPage/TeacherListingPage";
import TeacherProfileDetails from "../pages/TeacherListingPage/TeacherProfileDetails";
import MyTuitions from "../pages/Dashboard/MyTuitions/MyTuitions";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import UserManagment from "../pages/Dashboard/UserManagment/UserManagment";
import TuitionManagement from "../pages/Dashboard/TuitionManagement/TuitionManagement";
import TeacherApplications from "../pages/Dashboard/TeacherApplications/TeacherApplications";
import TuitionDetails from "../pages/Tuition/TuitionDetails";
import AppliedTutors from "../pages/Dashboard/AppliedTutors/AppliedTutors";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AppliedStudents from "../pages/Dashboard/AppliedStudents/AppliedStudents";
import Checkout from "../pages/Dashboard/Checkout/Checkout";

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
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
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
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "applied-tutors",
        element: <AppliedTutors></AppliedTutors>,
      },
      {
        path: "checkout",
        element: <Checkout></Checkout>,
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
        path: "applied-students",
        element: <AppliedStudents></AppliedStudents>,
      },
      {
        path: "user-management",
        element: <UserManagment></UserManagment>,
      },
      {
        path: "tuition-management",
        element: <TuitionManagement></TuitionManagement>,
      },
      {
        path: "teacher-applications",
        element: <TeacherApplications></TeacherApplications>,
      },
    ],
  },
]);
