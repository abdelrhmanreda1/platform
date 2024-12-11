import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ChooseRole from "./pages/ChooseRole";
import ProfileLayout from "./ui/ProfileLayout";
import ProfileHome from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetailsPage from "./pages/JopDetails";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/chooseRole", element: <ChooseRole /> },
      { path: "/login", element: <Login /> },
      { path: "/signup/:role", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: <ProfileLayout />,
    children: [
      { index: true, element: <ProfileHome /> },
      { path: "jobs", element: <Jobs /> },
      { path: "jobs/:jobId", element: <JobDetailsPage /> },
      {
        path: "/dashboard/jobs/:jobId/apply",
        element: <PostJob />,
      },
      { path: "yourProfile", element: <Profile /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
