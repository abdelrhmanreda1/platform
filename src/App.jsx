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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RegisterCompany from "./pages/RegisterCompany";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ui/ProtectedRoute";

import PasswordReset from "./pages/PasswordReset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/chooseRole", element: <ChooseRole /> },
      { path: "/login", element: <Login /> },
      { path: "/password-reset", element: <PasswordReset /> },

      { path: "/signup/:role", element: <Register /> },
      { path: "/signup/company", element: <RegisterCompany /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <ProfileLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ProfileHome /> },
      { path: "jobs", element: <Jobs /> },
      { path: "jobs/:jobId", element: <JobDetailsPage /> },
      {
        path: "jobs/post",
        element: <PostJob />,
      },
      { path: "yourProfile", element: <Profile /> },
    ],
  },
]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <ToastContainer />
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
