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
import TeacherEarnings from "../pages/Dashboard/TeacherEarnings/TeacherEarnings";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import TeacherRoute from "./TeacherRoute";
import StudnetRoute from "./StudentRoute";

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
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
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
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "tutor-request",
        element: (
          <PrivateRoute>
            <StudnetRoute>
              <TutorRequest></TutorRequest>
            </StudnetRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-tuitions",
        element: (
          <PrivateRoute>
            <StudnetRoute>
              <MyTuitions></MyTuitions>
            </StudnetRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <StudnetRoute>
              <PaymentHistory></PaymentHistory>
            </StudnetRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "applied-tutors",
        element: (
          <PrivateRoute>
            <StudnetRoute>
              <AppliedTutors></AppliedTutors>
            </StudnetRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <StudnetRoute>
              <Checkout></Checkout>
            </StudnetRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "teacher-request",
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <TeacherRequest></TeacherRequest>
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <MyProfile></MyProfile>
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "applied-students",
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <AppliedStudents></AppliedStudents>
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "earnings",
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <TeacherEarnings></TeacherEarnings>
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UserManagment></UserManagment>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "tuition-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <TuitionManagement></TuitionManagement>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "teacher-applications",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <TeacherApplications></TeacherApplications>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
