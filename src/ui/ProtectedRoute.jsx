import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  //   const { user } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 2000);
    }
  }, [token, navigate]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!token) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
